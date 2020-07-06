//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Plot
import Publish

extension Array where Element == Node<HTML.ListContext> {
    static func genArt(with context: PublishingContext<PersonalWebsite>) -> Self {
        
        let allItems = PersonalWebsite.genArt.compactMap { $0 }.reversed()

        return [
            .forEach(allItems) { item in
                .li(
                    .class("module"),
                    .a(
                        .href("\((item.metadata["thumbnail"]!).fileName())/"),
                        .img(
                            .src(item.metadata["thumbnail"]!),
                            .alt("\((item.metadata["thumbnail"]!).fileName()) thumbnail")
                        )
                    )
                )
            }
        ]
    }
}
