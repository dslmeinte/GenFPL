import {GenFPLConfiguration} from "../config-lang/config-lang.types.js"
import {Annotation, builtinClassifiers, builtinPrimitives, Language, Property} from "@lionweb/core"


export const generateMetamodel = (configuration: GenFPLConfiguration): Language[] => {
    return [
        ...(configuration.comments ? [generateCommentsLanguage(configuration)] : [])
    ]
}

const generateCommentsLanguage = (_: GenFPLConfiguration): Language => {
    const language = new Language("comments-lang", "0", "comments-lang", "comments-lang")
    const comment = new Annotation(language, "comments-comment", "comments-comment", "0")
    comment.annotates = builtinClassifiers.node
    language.havingEntities(comment)
    const comment_comment = new Property(comment, "comment", "comments-comment-comment", "comments-comment-comment").ofType(builtinPrimitives.stringDatatype)
    comment.havingFeatures(comment_comment)
    return language
}

