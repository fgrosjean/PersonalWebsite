//
//  File.swift
//  
//
//  Created by Fernando Grosjean on 7/5/20.
//

import Foundation
import Publish
import Files
import ShellOut

public extension DeploymentMethod {
    static func myDeploy(to repository: String) -> Self {
        let remote = "git@github.com:\(repository).git"
        
        return DeploymentMethod(name: "Git (\(remote))") { context in
            let folder = try context.folder(at: Path("/"))
            
            if !folder.containsSubfolder(named: ".git") {
                try shellOut(to: .gitInit(), at: folder.path)

                try shellOut(
                    to: "git remote add origin \(remote)",
                    at: folder.path
                )
            }

            try shellOut(
                to: "git remote set-url origin \(remote)",
                at: folder.path
            )

            _ = try? shellOut(
                to: .gitPull(remote: "origin", branch: "master"),
                at: folder.path
            )


            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd HH:mm"
            let dateString = dateFormatter.string(from: Date())
            
            _ = try? shellOut(
                to: """
                publish generate
                """,
                at: folder.path
            )
            
            try? folder.subfolder(named: "docs").delete()
            try? folder.subfolder(named: "Output").rename(to: "docs")

            do {
                try shellOut(
                    to: """
                    git add . && git commit -a -m \"Publish deploy \(dateString)\" --allow-empty
                    """,
                    at: folder.path
                )

                try shellOut(
                    to: .gitPush(remote: "origin", branch: "master"),
                    at: folder.path
                )
            } catch let error as ShellOutError {
                throw PublishingError(infoMessage: error.message)
            } catch {
                throw error
            }
        }
    }
}
