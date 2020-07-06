//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Publish

extension PublishingStep where Site == PersonalWebsite {
    static func addProjects() -> Self {
        .step(named: "Addding Projects") { context in
            let folder = try! context.folder(at: "Content/Projects").files
            
            for file in folder {
                // Parsing MD files
                if file.name.fileExtension() == "md" {
                    let md = String(data: try file.read(), encoding: .utf8)
                    let html = context.markdownParser.parse(md!)
                    PersonalWebsite.projects.append(html)
                } else {
                    // Copying images to Output
                    try context.copyFileToOutput(
                        from: Path("Content/Projects/\(file.name)"),
                        to: Path("projects")
                    )
                }
            }
        }
    }
}
