//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Publish

extension PublishingStep where Site == PersonalWebsite {
    static func addWritings() -> Self {
        .step(named: "Addding Writings") { context in
            let folder = try! context.folder(at: "Content/Writings/Writings").files.recursive
            
            for file in folder {
                // Parsing MD files
                if file.name.fileExtension() == "md" {
                    let md = String(data: try file.read(), encoding: .utf8)
                    let html = context.markdownParser.parse(md!)
                    PersonalWebsite.writings.append(html)
                } else {
                    // Copy assets to output
                    let path = file.path
                    if let r = path.range(of: "Code/", options: .backwards) {
                        let imageName = String(path[r.upperBound...])
                        try context.copyFileToOutput(
                            from: Path(imageName),
                            to: Path("writings/assets")
                        )
                    }
                }
            }
        }
    }
}
