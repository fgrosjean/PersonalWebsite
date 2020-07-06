//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Publish
import Plot
import Ink
import Files

struct PersonalWebsite: Website {
    static let repoName = "PersonalWebsite"
    
    enum SectionID: String, WebsiteSectionID {
        case projects
        case generativeArt
        case writings
        case about
    }

    struct ItemMetadata: WebsiteItemMetadata { }

    var url = URL(string: "https://your-website-url.com")!
    var name = "Fernando Grosjean"
    var description = "Fernando Grosjean's personal website"
    var language: Language { .english }
    var imagePath: Path? { nil }
}

try PersonalWebsite().publish(using: [
    .copyResources(),
    .addProjects(),
    .addWritings(),
    .addMarkdownFiles(at: Path("Content/Writings")),
    .addGenArt(),
    .addMarkdownFiles(at: Path("Content/GenerativeArt")),
    .addAbout(),
    .addBaseURLforGithubPages(),
    .generateHTML(withTheme: .myTheme),
    .generateSiteMap(),
    .deploy(using: .myDeploy(to: "fgrosjean/\(PersonalWebsite.repoName)"))
])

extension PersonalWebsite {
    static var projects = [Markdown]()
    static var genArt   = [Markdown]()
    static var writings = [Markdown]()
    static var about    = [Markdown]()
    static var urlPrefix = ""
}

