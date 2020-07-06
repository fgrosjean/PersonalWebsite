//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Publish
import Plot

extension Node where Context == HTML.DocumentContext {
    static func head(section: PersonalWebsite.SectionID,
                     title: String? = nil,
                     isGenArt:Bool = false,
                     isPost:Bool = false ) -> Self {
        
        var title: String {
            if isPost && title != nil { return "\(title!) — Fernando Grosjean" }

            switch section {
            case .about: return "About — Fernando Grosjean"
            case .generativeArt: return "Generative Art — Fernando Grosjean"
            case .projects: return "Projects — Fernando Grosjean"
            case .writings: return "Writings — Fernando Grosjean"
            }
        }
        
        return .head(
            .encoding(.utf8),
            .title(title),
            .viewport(.accordingToDevice),
            .description("Technology tinkerer. I’m the operator with my pocket calculator. 🤖"),
            .favicon(Favicon(path: "\(PersonalWebsite.urlPrefix)/favicon.png", type: "image/png")),
            .stylesheet(Path("\(PersonalWebsite.urlPrefix)/style.css")),
            .script(.defer(), .src("\(PersonalWebsite.urlPrefix)/scripts.js")),
            
            .if(isPost,
                .group(
                    .stylesheet(Path("\(PersonalWebsite.urlPrefix)/gruvbox-dark.min.css")),
                    .script(.src("\(PersonalWebsite.urlPrefix)/highlight.pack.js")),
                    .script(.src("\(PersonalWebsite.urlPrefix)/highlightjs-line-numbers.min.js")),
                    .script(
                        .raw(
                            """
                            hljs.configure({tabReplace: '  '});
                            hljs.initHighlightingOnLoad();
                            hljs.initLineNumbersOnLoad();
                            """
                        )
                    )
                )
            ),
            
            .if(isGenArt, .script(.defer(), .src("https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js")))
        )
    }
}
