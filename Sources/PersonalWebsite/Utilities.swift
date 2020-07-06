//
//  File.swift
//  Created by Fernando Grosjean on 7/2/20.
//

import Foundation
import Plot

enum Orientation { case horizontal, vertical }

enum Utilies {
    static func lineSeparatorFactory(orientation   : Orientation,
                                     numberOfItems : Int,
                                     startPosition : Int,
                                     hiddenIndex   : [Int]) -> [Node<HTML.BodyContext>] {
        
        var nodes = [Node<HTML.BodyContext>]()
        
        let orientationClass = orientation == .horizontal ? "horizontal-grid-separator" : "vertical-grid-separator"
        func hiddenClass(for index: Int) -> String {
            return hiddenIndex.contains(index) ? "hide-separator" : ""
        }
        
        (startPosition..<(startPosition + numberOfItems)).forEach {
            nodes.append(
                .div(
                    .class("grid-separator \(orientationClass) \(hiddenClass(for: $0))"),
                    .if(orientation == .horizontal,
                        .style("grid-row-start: \($0)"), else:
                        .style("grid-column-start: \($0)")
                    )
                    
                )
            )
        }
        
        return nodes
    }
}

extension String {
    func fileName() -> String { URL(fileURLWithPath: self).deletingPathExtension().lastPathComponent }
    func fileExtension() -> String { URL(fileURLWithPath: self).pathExtension }
}
