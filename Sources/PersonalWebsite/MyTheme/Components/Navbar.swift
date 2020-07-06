//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Plot
import Publish

extension Node where Context == HTML.BodyContext {
    static func navbar(for sectionID: PersonalWebsite.SectionID, context: PublishingContext<PersonalWebsite>) -> Self {
        
        // MARK: - Active Section
        func getIsActiveSection(forSection section: Section<PersonalWebsite>) -> Node<HTML.AnchorContext> {
            sectionID == section.id ? .id("active-section") : .empty
        }
        
        // MARK: - Generate li item
        func getListNode(for section: Section<PersonalWebsite> ) -> Node<HTML.ListContext> {
            var title: String {
                switch section.id {
                case .about         : return "About"
                case .generativeArt : return "Generative Art"
                case .projects      : return "Projects"
                case .writings      : return "Writings"
                }
            }
            
            return .li(
                .a(
                    getIsActiveSection(forSection: section),
                    .href("\(PersonalWebsite.urlPrefix)\(section.path.absoluteString)/"),
                    .text(title)
                )
            )
        }
        
        // MARK: - Markup
        return .header(
            .div(
                .id("header-container"),
                .h1(.a(.href("\(PersonalWebsite.urlPrefix)/about"), .text("Fernando Grosjean"))),
                .ul(.forEach(context.sections) { getListNode(for: $0) })
            )
        )
    }
}
