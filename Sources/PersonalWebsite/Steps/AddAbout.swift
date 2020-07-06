//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Publish

extension PublishingStep where Site == PersonalWebsite {
    static func addAbout() -> Self {
        .step(named: "Addding About") { context in
            let folder = try! context.folder(at: "Content/About").files
            
            for file in folder {
                // Parsing MD files
                if file.name.fileExtension() == "md" {
                    let md = String(data: try file.read(), encoding: .utf8)
                    let html = context.markdownParser.parse(md!)
                    PersonalWebsite.about.append(html)
                } else {
                    // Copying images to Output
                    try context.copyFileToOutput(
                        from: Path("Content/About/\(file.name)"),
                        to: Path("about")
                    )
                }
            }
        }
    }
}
