//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Publish
import Plot

extension Node where Context == HTML.BodyContext {
    static func container(for sectionID: PersonalWebsite.SectionID,
                          isPost:Bool = false,
                          content: [Node]) -> Self {
        
        var sectionIDName: String {
            switch sectionID {
            case .about               : return "about-container"
            case .projects, .writings : return "writings-and-projects-container"
            case .generativeArt       : return "gen-art-detail-container"
//            default: return ""
            }
        }
        
        return .div(
            .id("main-container"),
            .div(
                .id(sectionIDName),
                .class("content-container"),
                .if(sectionID == .projects, .class("content-container project-container")),
                .if(isPost, .id("post-container")),
                .forEach(content) { $0 }
            ),
            .footer()
        )
    }
}

extension Node where Context == HTML.BodyContext {
    static func container(for sectionID: PersonalWebsite.SectionID,
                          content: [Node<HTML.ListContext>]) -> Self {
        var sectionIDName: String {
            switch sectionID {
            case .generativeArt : return "gen-art-container"
            default: return ""
            }
        }
        
        return .div(
            .id("main-container"),
            .ul(
                .id(sectionIDName),
                .class("content-container"),
                .forEach(content) { $0 }
            ),
            .footer()
        )
    }
}

