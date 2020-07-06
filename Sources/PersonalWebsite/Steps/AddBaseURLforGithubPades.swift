//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Publish

extension PublishingStep where Site == PersonalWebsite {
    static func addBaseURLforGithubPages() -> Self {
        .step(named: "Addding Base URL for Github Pages") { context in
            _ = try context.folder(at: "/").files.forEach { file in
               if file.name.fileExtension() == "baseurl" {
                   PersonalWebsite.urlPrefix = file.name.fileName() == "on" ? "/\(PersonalWebsite.repoName)" : ""
               }
           }
        }
    }
}
