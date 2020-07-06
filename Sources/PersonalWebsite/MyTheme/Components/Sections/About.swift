//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Plot
import Publish
import Sweep

extension Array where Element == Node<HTML.BodyContext> {
    static func about(with context: PublishingContext<PersonalWebsite>) -> Self {
        
        let data = PersonalWebsite.about[0]
        let english = String(data.html.substrings(between: "<h2>english</h2>", and: "<h2>spanish</h2>").first!)
        let spanish = String(data.html.substrings(between: "<h2>spanish</h2>", and: "<h2>social media</h2>").first!)
        let socialLinks = String(data.html.substrings(between: "<h2>social media</h2><ul>", and: "</ul>").first!)
        let lastUpdate = String(data.html.substrings(between: "<h2>last update</h2><p>", and: "</p>").first!)
        
        return [
            .div(
                .id("switcher-inner-container"),
                .ul(
                    .li(.button(.id("ES-button"), .text("ES"))),
                    .li(.class("active-language"), .button(.id("EN-button"), .text("EN")))
                )
            ),
            
            .div(.id("avatar-container"), .img(.src("avatar.svg"), .alt("Avatar"))),
            .img(.id("hello-text"), .src("hello.svg"), .alt("Hello Text")),
            .img(.id("hola-text"), .src("hola.svg"), .alt("Hola Text")),
            
            .div(
                .id("title-container"),
                .span(.style("grid-row: 5 / span 1"), .class("separator")),
                .h2("About"),
                .span(.style("grid-row: 6 / span 1; height: 2px"), .class("separator"))
            ),
            
            .div(.id("about-text-english"), .class("content-text-container"), .raw(english)),
            .div(.id("about-text-spanish"), .class("content-text-container"), .style("visibility: hidden"), .raw(spanish)),
            
            .span(.id("social-links-separator"), .class("separator")),
            .ul(
                .id("social-links"),
                .raw(socialLinks)
            ),
            
            .div(.id("last-update"), .p("Last Update: \(lastUpdate)")),
            
            .forEach(Utilies.lineSeparatorFactory(orientation: .horizontal, numberOfItems: 8, startPosition: 3, hiddenIndex: [])) { $0 },
            .forEach(Utilies.lineSeparatorFactory(orientation: .vertical, numberOfItems: 4, startPosition: 1, hiddenIndex: [3, 4])) { $0 }
        ]
    }
}
