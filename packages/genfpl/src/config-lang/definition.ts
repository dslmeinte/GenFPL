import {
    builtinClassifiers,
    builtinPrimitives,
    Classifier,
    Concept,
    Containment,
    Language,
    lioncore,
    Property,
    Reference
} from "@lionweb/core"


export const configLang = new Language("GenFPL Configuration Language", "0", "genfpl-config-language", "genfpl-config-language")

const lionCoreEntity = (entityName: string) =>
    lioncore.entities.find((entity) => entity.name === entityName)!

const m3Classifier = lionCoreEntity("Classifier") as Classifier
const m3Concept = lionCoreEntity("Concept") as Concept
    // TODO  expose these objects as a meta-type (interface)

const subLanguageIdentification = new Concept(configLang, "SubLanguageIdentification", "genfpl-SubLanguageIdentification", "genfpl-SubLanguageIdentification", false)
    .implementing(builtinClassifiers.inamed)
subLanguageIdentification.havingFeatures(
    new Property(subLanguageIdentification, "version", "genfpl-SubLanguageIdentification-version", "genfpl-SubLanguageIdentification-version").ofType(builtinPrimitives.stringDatatype),
    new Property(subLanguageIdentification, "key", "genfpl-SubLanguageIdentification-key", "genfpl-SubLanguageIdentification-key").ofType(builtinPrimitives.stringDatatype),
    new Property(subLanguageIdentification, "id", "genfpl-SubLanguageIdentification-id", "genfpl-SubLanguageIdentification-id").ofType(builtinPrimitives.stringDatatype)
)

const recordDefinitionReferences = new Concept(configLang, "RecordDefinitionReferences", "genfpl-RecordDefinitionReferences", "genfpl-RecordDefinitionReferences", false)
const recordDefinitionReferences_recordConcept = new Reference(recordDefinitionReferences, "recordConcept", "genfpl-RecordDefinitionReferences-recordConcept", "genfpl-RecordDefinitionReferences-recordConcept").ofType(m3Concept)
const recordDefinitionReferences_attributeConcept = new Reference(recordDefinitionReferences, "attributeConcept", "genfpl-RecordDefinitionReferences-attributeConcept", "genfpl-RecordDefinitionReferences-attributeConcept").ofType(m3Concept)
recordDefinitionReferences.havingFeatures(recordDefinitionReferences_recordConcept, recordDefinitionReferences_attributeConcept)

const recordArea = new Concept(configLang, "RecordArea", "genfpl-RecordArea", "genfpl-RecordArea", false)
const recordArea_definition = new Containment(recordArea, "definition", "genfpl-RecordArea-definition", "genfpl-RecordArea-definition").ofType(recordDefinitionReferences)
const recordArea_recordLiteralConceptName = new Property(recordArea, "recordLiteralConceptName", "genfpl-RecordArea-recordLiteralConceptName", "genfpl-RecordArea-recordLiteralConceptName").ofType(builtinPrimitives.stringDatatype)
const recordArea_attributeValueConceptName = new Property(recordArea, "recordLiteralConceptName", "genfpl-RecordArea-recordLiteralConceptName", "genfpl-RecordArea-recordLiteralConceptName").ofType(builtinPrimitives.stringDatatype)
recordArea.havingFeatures(recordArea_definition, recordArea_recordLiteralConceptName, recordArea_attributeValueConceptName)

const configuration = new Concept(configLang, "GenFPLConfiguration", "genfpl-config", "genfpl-config", false)
const configuration_subLanguageIdentification = new Containment(configuration, "subLanguageIdentification", "genfpl-config-subLanguageIdentification", "genfpl-config-subLanguageIdentification").ofType(subLanguageIdentification)
const configuration_valueClassifier = new Reference(configuration, "valueClassifier", "genfpl-valueClassifier", "genfpl-valueClassifier")
    .ofType(m3Classifier).isOptional()
const configuration_typeClassifier = new Reference(configuration, "typeClassifier", "genfpl-typeClassifier", "genfpl-typeClassifier")
    .ofType(m3Classifier).isOptional()
const configuration_booleanArea = new Property(configuration, "booleanArea", "genfpl-booleanArea", "genfpl-booleanArea").ofType(builtinPrimitives.booleanDatatype).isOptional()
const configuration_recordArea = new Containment(configuration, "recordArea", "genfpl-recordArea", "genfpl-recordArea").ofType(recordArea).isOptional()
const configuration_comments = new Property(configuration, "comments", "genfpl-comments", "genfpl-comments").ofType(builtinPrimitives.booleanDatatype).isOptional()
configuration.havingFeatures(configuration_subLanguageIdentification, configuration_valueClassifier, configuration_typeClassifier, configuration_booleanArea, configuration_recordArea, configuration_comments)

configLang.havingEntities(configuration, subLanguageIdentification, recordDefinitionReferences, recordArea)

