//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Publish

extension PublishingStep where Site == PersonalWebsite {
    static func addGenArt() -> Self {
        .step(named: "Addding Generative Art") { context in
            let folder = try! context.folder(at: "Content/GenerativeArt/GenerativeArt").files
            
            for file in folder {
                // Parsing MD files
                if file.name.fileExtension() == "md" {
                    let md = String(data: try file.read(), encoding: .utf8)
                    let html = context.markdownParser.parse(md!)
                    PersonalWebsite.genArt.append(html)
                } else {
                    // Copying images to Output
                    try context.copyFileToOutput(
                        from: Path("Content/GenerativeArt/GenerativeArt/\(file.name)"),
                        to: Path("generativeArt")
                    )
                }
            }
        }
    }
}
