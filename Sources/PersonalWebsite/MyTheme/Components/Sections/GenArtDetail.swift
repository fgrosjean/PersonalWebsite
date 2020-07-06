//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Plot
import Publish

extension Array where Element == Node<HTML.BodyContext> {
    static func genArtDetail(for page: Page) -> Self {
        
        let numberOfItems = PersonalWebsite.genArt.compactMap { $0 }.count
        let currentIndex = Int(page.title)!
        let nextIndex = currentIndex == 1 ? nil : currentIndex - 1
        let previousIndex = currentIndex == numberOfItems ? nil : currentIndex + 1
        
        return [
            .script(.src("../\(page.title).js")),
            .div(
                .id("detail"),
                .div(.id("sketch")),
                .div(.id("code-container"), page.body.node)
            ),
            .ul(
                .id("navigation"),
                
                .li(
                    .unwrap(previousIndex) { previousIndex in
                        .a(
                            .href("../\(String(format: "%03d", previousIndex))"),
                            .span(.class("separator")),
                            .h4(
                                .id("prev-nav"),
                                .span("←"),
                                .text(" Previous")
                            ),
                            .span(.style("height: 2px"), .class("separator"))
                        )
                    }
                ),
                
                .li(
                    .unwrap(nextIndex) { nextIndex in
                        .a(
                            .href("../\(String(format: "%03d", nextIndex))"),
                            .span(.class("separator")),
                            .h4(
                                .id("next-nav"),
                                .text(" Next"),
                                .span("→")
                            ),
                            .span(.style("height: 2px"), .class("separator"))
                        )
                    }
                )
            ),
            
            .forEach(Utilies.lineSeparatorFactory(orientation: .horizontal, numberOfItems: 4, startPosition: 3, hiddenIndex: [])) { $0 },
            .forEach(Utilies.lineSeparatorFactory(orientation: .vertical, numberOfItems: 8, startPosition: 1, hiddenIndex: [])) { $0 }
        ]
    }
}
