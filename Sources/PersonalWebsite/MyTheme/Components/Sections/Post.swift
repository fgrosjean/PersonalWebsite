//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Plot
import Publish

extension Array where Element == Node<HTML.BodyContext> {
    static func post(for item: Item<PersonalWebsite>, with context: PublishingContext<PersonalWebsite>) -> Self {
        return [
            .element(named: "style", text: """
                @font-face {
                    font-family: "Source Serif Pro";
                    src: url("\(PersonalWebsite.urlPrefix)/fonts/text-regular.woff2") format("woff2");
                    src: url("\(PersonalWebsite.urlPrefix)/fonts/text-regular.woff") format("woff");
                    font-weight: normal;
                    font-style: normal;
                    font-display: block;
                }

                @font-face {
                    font-family: "Source Serif Pro";
                    src: url("\(PersonalWebsite.urlPrefix)/fonts/text-bold.woff2") format("woff2");
                    src: url("\(PersonalWebsite.urlPrefix)/fonts/text-bold.woff") format("woff");
                    font-weight: bold;
                    font-style: normal;
                    font-display: block;
                }
            """),
            .div(
                .id("text-container"),
                .class("content-text-container"),
                .div(
                    .id("title-container"),
                    .span(.style("grid-row: 5 / span 1"), .class("separator")),
                    .h2(.text(item.content.title)),
                    .span(.style("grid-row: 6 / span 1; height: 2px"), .class("separator"))
                ),
                item.content.body.node,
                .span(.style("grid-row: 6 / span 1; height: 2px; margin: 40px 0 0 0"), .class("separator"))
            ),
            
            .div(.class("grid-separator horizontal-grid-separator"), .style("grid-row-start: 3")),
            .div(.class("grid-separator horizontal-grid-separator"), .style("grid-row-start: 4")),
            
            .forEach(Utilies.lineSeparatorFactory(orientation: .vertical, numberOfItems: 5, startPosition: 1, hiddenIndex: [])) { $0 }
        ]
    }
}
