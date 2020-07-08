//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Plot
import Publish

extension Array where Element == Node<HTML.BodyContext> {
    static func writings(with context: PublishingContext<PersonalWebsite>) -> Self {
        
        let allItems = PersonalWebsite.writings.sorted { $0.metadata["date"]! > $1.metadata["date"]! }

        return [
            .if(allItems.count > 0,
                .div(
                    .id("items"),
                    .span(.class("separator")),
                    .forEach(allItems) {
                        .div(
                            .class("post-item"),
                            .span(.class("post-number"), .text("00")),
                            .div(
                                .class("text-container"),
                                .h3(.a(.href("\($0.metadata["filename"]!)/"), .text($0.metadata["title"]!)))
                            ),
                            .a(
                                .href("\($0.metadata["filename"]!)/"),
                                .class("arrow"),
                                .span(
                                    .style("display: block"),
                                    .text("→")
                                )
                            ),
                            .div(.class("writings-and-projects-separator"))
                        )
                    },
                    .span(.style("margin-top: -2px"), .class("separator"))
                )
            ),
            
            .div(.class("grid-separator horizontal-grid-separator"), .style("grid-row-start: 3")),
            .forEach(Utilies.lineSeparatorFactory(orientation: .vertical, numberOfItems: 6, startPosition: 1, hiddenIndex: [4, 5])) { $0 }
        ]
    }
}
