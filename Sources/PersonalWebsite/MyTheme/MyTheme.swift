//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Publish
import Plot

extension Theme where Site == PersonalWebsite {
    static var myTheme: Self { Theme(htmlFactory: MyThemeHTMLFactory()) }
    
    private struct MyThemeHTMLFactory: HTMLFactory {
        // MARK: - Index
        func makeIndexHTML(for index: Index, context: PublishingContext<PersonalWebsite>) throws -> HTML {
            HTML(.head(.script(.text("window.location.replace('\(PersonalWebsite.urlPrefix)/about')"))))
        }
        
        // MARK: - Section
        func makeSectionHTML(for section: Section<PersonalWebsite>, context: PublishingContext<PersonalWebsite>) throws -> HTML {
            var content: [Node<HTML.BodyContext>] {
                switch section.id {
                case .projects : return .projects(with: context)
                case .about    : return .about(with: context)
                case .writings : return .writings(with: context)
                default        : return [.empty]
                }
            }
            
            return HTML(
                .lang(Language.english),
                .head(section: section.id, isPost: false),
                .body(
                    .id(section.id.rawValue),
                    .navbar(for: section.id, context: context),
                    .if(section.id == .generativeArt,
                        .container(for: section.id, content: .genArt(with: context)),
                        else: .container(for: section.id, content: content)
                    )
                )
            )
        }
        
        // MARK: - Item
        func makeItemHTML(for item: Item<PersonalWebsite>, context: PublishingContext<PersonalWebsite>) throws -> HTML {
            var content: [Node<HTML.BodyContext>] {
                switch item.sectionID {
                case .writings : return .post(for: item, with: context)
                default        : return [.empty]
                }
            }
            
            return HTML(
                .lang(Language.english),
                .head(section: item.sectionID, title: item.title, isPost: true),
                .body(
                    .id(item.sectionID.rawValue),
                    .navbar(for: item.sectionID, context: context),
                    .container(for: item.sectionID, isPost: true,  content: content)
                )
            )
        }
        
        // MARK: - Page
        func makePageHTML(for page: Page, context: PublishingContext<PersonalWebsite>) throws -> HTML {
            var bodyID: String {
                switch page.description {
                    case "Generative Art" : return "gen-art-detail"
                    default : return ""
                }
            }
            
            var content: [Node<HTML.BodyContext>] {
                switch page.description {
                case "Generative Art" : return .genArtDetail(for: page)
                    default : return [.empty]
                }
            }
                        
            return HTML(
                .lang(Language.english),
                .head(section: PersonalWebsite.SectionID.generativeArt, isGenArt: true, isPost: true),
                .body(
                    .id(bodyID),
                    .navbar(for: PersonalWebsite.SectionID.generativeArt, context: context),
                    .container(for: PersonalWebsite.SectionID.generativeArt, content: content)
                )
            )
        }
        
        // MARK: - Tags
        func makeTagListHTML(for page: TagListPage, context: PublishingContext<PersonalWebsite>) throws -> HTML? { nil }
        func makeTagDetailsHTML(for page: TagDetailsPage, context: PublishingContext<PersonalWebsite>) throws -> HTML? { nil }
    }
}
