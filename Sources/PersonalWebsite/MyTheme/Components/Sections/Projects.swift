//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Plot
import Publish
import Ink

struct Projects {
    let title: String
    let items: [Markdown]
}

extension Array where Element == Node<HTML.BodyContext> {
    static func projects(with context: PublishingContext<PersonalWebsite>) -> Self {
        
        let items = PersonalWebsite.projects
        let apps = items.filter { $0.metadata["tags"] == "Apps" }
        let openSource = items.filter { $0.metadata["tags"] == "Open Source" }
        let projects = [
            Projects(title: "Apps", items: apps),
            Projects(title: "Open Source", items: openSource),
        ]
                
        return [
            .div(
                .id("items"),

                .forEach(projects) { section in
                    .if(section.items.count > 0,
                        .group(
                            .div(
                                .style("position: relative"),
                                .h3(.text(section.title)),
                                .div(.class("writings-and-projects-separator"))
                            ),
                            .span(.class("separator")),
                            .forEach(section.items) { item in
                                .div(
                                    .class("post-item project-item"),
                                    .a(.href(String(item.metadata["link"]!)), .rel(.noreferrer), .target(.blank), .img(.src(item.metadata["icon"]!), .alt("\(item.metadata["title"]!) icon"))),
                                    .div(
                                        .class("text-container"),
                                        .h3(.a(.href(item.metadata["link"]!), .rel(.noreferrer), .target(.blank), .text(item.metadata["title"]!))),
                                        .raw(item.html)
                                    ),
                                    .a(.href(item.metadata["link"]!), .rel(.noreferrer), .target(.blank), .class("arrow"), .span(.style("display: block"), .text("→"))),
                                    .div(.class("writings-and-projects-separator"))
                                )
                            },
                            .span(.style("margin-top: -2px"), .class("separator"))
                        )
                    )
                    
                }
            ),
            
            .div(.class("grid-separator horizontal-grid-separator"), .style("grid-row-start: 3")),
            .forEach(Utilies.lineSeparatorFactory(orientation: .vertical, numberOfItems: 6, startPosition: 1, hiddenIndex: [4, 5])) { $0 }
        ]
    }
}
