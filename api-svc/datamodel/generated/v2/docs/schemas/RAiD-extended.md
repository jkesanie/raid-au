# RAiD-extended 

None

URI: https://raid.org/datamodel/api/raid/extended

SchemaDefinition({
  'name': 'RAiD-extended',
  'id': 'https://raid.org/datamodel/api/raid/extended',
  'prefixes': {'linkml': Prefix({'prefix_prefix': 'linkml', 'prefix_reference': 'https://w3id.org/linkml/'}),
    'xsd': Prefix({'prefix_prefix': 'xsd', 'prefix_reference': 'http://www.w3.org/2001/XMLSchema#'}),
    'shex': Prefix({'prefix_prefix': 'shex', 'prefix_reference': 'http://www.w3.org/ns/shex#'}),
    'schema': Prefix({'prefix_prefix': 'schema', 'prefix_reference': 'http://schema.org/'})},
  'default_prefix': 'https://raid.org/datamodel/api/raid/extended/',
  'types': {'string': TypeDefinition({
      'name': 'string',
      'description': 'A character string',
      'notes': ['In RDF serializations, a slot with range of string is treated as a literal or '
        'type xsd:string.   If you are authoring schemas in LinkML YAML, the type is '
        'referenced with the lower case "string".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'exact_mappings': ['schema:Text'],
      'rank': 1000,
      'base': 'str',
      'uri': 'xsd:string'
    }),
    'integer': TypeDefinition({
      'name': 'integer',
      'description': 'An integer',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "integer".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'exact_mappings': ['schema:Integer'],
      'rank': 1000,
      'base': 'int',
      'uri': 'xsd:integer'
    }),
    'boolean': TypeDefinition({
      'name': 'boolean',
      'description': 'A binary (true or false) value',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "boolean".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'exact_mappings': ['schema:Boolean'],
      'rank': 1000,
      'base': 'Bool',
      'uri': 'xsd:boolean',
      'repr': 'bool'
    }),
    'float': TypeDefinition({
      'name': 'float',
      'description': 'A real number that conforms to the xsd:float specification',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "float".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'exact_mappings': ['schema:Float'],
      'rank': 1000,
      'base': 'float',
      'uri': 'xsd:float'
    }),
    'double': TypeDefinition({
      'name': 'double',
      'description': 'A real number that conforms to the xsd:double specification',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "double".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'close_mappings': ['schema:Float'],
      'rank': 1000,
      'base': 'float',
      'uri': 'xsd:double'
    }),
    'decimal': TypeDefinition({
      'name': 'decimal',
      'description': ('A real number with arbitrary precision that conforms to the xsd:decimal '
         'specification'),
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "decimal".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'broad_mappings': ['schema:Number'],
      'rank': 1000,
      'base': 'Decimal',
      'uri': 'xsd:decimal'
    }),
    'time': TypeDefinition({
      'name': 'time',
      'description': ('A time object represents a (local) time of day, independent of any '
         'particular day'),
      'notes': ['URI is dateTime because OWL reasoners do not work with straight date or time',
        'If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "time".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'exact_mappings': ['schema:Time'],
      'rank': 1000,
      'base': 'XSDTime',
      'uri': 'xsd:time',
      'repr': 'str'
    }),
    'date': TypeDefinition({
      'name': 'date',
      'description': 'a date (year, month and day) in an idealized calendar',
      'notes': ["URI is dateTime because OWL reasoners don't work with straight date or time",
        'If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "date".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'exact_mappings': ['schema:Date'],
      'rank': 1000,
      'base': 'XSDDate',
      'uri': 'xsd:date',
      'repr': 'str'
    }),
    'datetime': TypeDefinition({
      'name': 'datetime',
      'description': 'The combination of a date and time',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "datetime".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'exact_mappings': ['schema:DateTime'],
      'rank': 1000,
      'base': 'XSDDateTime',
      'uri': 'xsd:dateTime',
      'repr': 'str'
    }),
    'date_or_datetime': TypeDefinition({
      'name': 'date_or_datetime',
      'description': 'Either a date or a datetime',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "date_or_datetime".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'base': 'str',
      'uri': 'linkml:DateOrDatetime',
      'repr': 'str'
    }),
    'uriorcurie': TypeDefinition({
      'name': 'uriorcurie',
      'description': 'a URI or a CURIE',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "uriorcurie".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'base': 'URIorCURIE',
      'uri': 'xsd:anyURI',
      'repr': 'str'
    }),
    'curie': TypeDefinition({
      'name': 'curie',
      'conforms_to': 'https://www.w3.org/TR/curie/',
      'description': 'a compact URI',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "curie".'],
      'comments': ['in RDF serializations this MUST be expanded to a URI',
        'in non-RDF serializations MAY be serialized as the compact representation'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'base': 'Curie',
      'uri': 'xsd:string',
      'repr': 'str'
    }),
    'uri': TypeDefinition({
      'name': 'uri',
      'conforms_to': 'https://www.ietf.org/rfc/rfc3987.txt',
      'description': 'a complete URI',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "uri".'],
      'comments': ['in RDF serializations a slot with range of uri is treated as a literal or '
        'type xsd:anyURI unless it is an identifier or a reference to an identifier, '
        'in which case it is translated directly to a node'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'close_mappings': ['schema:URL'],
      'rank': 1000,
      'base': 'URI',
      'uri': 'xsd:anyURI',
      'repr': 'str'
    }),
    'ncname': TypeDefinition({
      'name': 'ncname',
      'description': 'Prefix part of CURIE',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "ncname".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'base': 'NCName',
      'uri': 'xsd:string',
      'repr': 'str'
    }),
    'objectidentifier': TypeDefinition({
      'name': 'objectidentifier',
      'description': 'A URI or CURIE that represents an object in the model.',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "objectidentifier".'],
      'comments': ['Used for inheritance and type checking'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'base': 'ElementIdentifier',
      'uri': 'shex:iri',
      'repr': 'str'
    }),
    'nodeidentifier': TypeDefinition({
      'name': 'nodeidentifier',
      'description': 'A URI, CURIE or BNODE that represents a node in a model.',
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "nodeidentifier".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'base': 'NodeIdentifier',
      'uri': 'shex:nonLiteral',
      'repr': 'str'
    }),
    'jsonpointer': TypeDefinition({
      'name': 'jsonpointer',
      'conforms_to': 'https://datatracker.ietf.org/doc/html/rfc6901',
      'description': ('A string encoding a JSON Pointer. The value of the string MUST conform to '
         'JSON Point syntax and SHOULD dereference to a valid object within the '
         'current instance document when encoded in tree form.'),
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "jsonpointer".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'base': 'str',
      'uri': 'xsd:string',
      'repr': 'str'
    }),
    'jsonpath': TypeDefinition({
      'name': 'jsonpath',
      'conforms_to': 'https://www.ietf.org/archive/id/draft-goessner-dispatch-jsonpath-00.html',
      'description': ('A string encoding a JSON Path. The value of the string MUST conform to JSON '
         'Point syntax and SHOULD dereference to zero or more valid objects within the '
         'current instance document when encoded in tree form.'),
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "jsonpath".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'base': 'str',
      'uri': 'xsd:string',
      'repr': 'str'
    }),
    'sparqlpath': TypeDefinition({
      'name': 'sparqlpath',
      'conforms_to': 'https://www.w3.org/TR/sparql11-query/#propertypaths',
      'description': ('A string encoding a SPARQL Property Path. The value of the string MUST '
         'conform to SPARQL syntax and SHOULD dereference to zero or more valid '
         'objects within the current instance document when encoded as RDF.'),
      'notes': ['If you are authoring schemas in LinkML YAML, the type is referenced with the '
        'lower case "sparqlpath".'],
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'base': 'str',
      'uri': 'xsd:string',
      'repr': 'str'
    })},
  'enums': {'AbstractRaidDynamicEnum': EnumDefinition({
      'name': 'AbstractRaidDynamicEnum',
      'description': ('This dynamic enumeration is part of the Research Activity Identifier (RAiD) '
         'controlled lists available at https://vocabulary.raid.org/.'),
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'abstract': True
    }),
    'RaidIdentifierSchemaURIEnum': EnumDefinition({
      'name': 'RaidIdentifierSchemaURIEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/identifier.schemaUri/170'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'RegistrationAgencySchemaURIEnum': EnumDefinition({
      'name': 'RegistrationAgencySchemaURIEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/identifier.registrationAgency.schemaUri/242'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'TitleTypeIdEnum': EnumDefinition({
      'name': 'TitleTypeIdEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/title.type.schemaUri/382'],
          'relationship_types': ['skos:narrower'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'TitleTypeSchemaURIEnum': EnumDefinition({
      'name': 'TitleTypeSchemaURIEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/title.type.schemaUri/377'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'DescriptionTypeIdEnum': EnumDefinition({
      'name': 'DescriptionTypeIdEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/description.type.schemaUri/276'],
          'relationship_types': ['skos:narrower'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'DescriptionTypeSchemaURIEnum': EnumDefinition({
      'name': 'DescriptionTypeSchemaURIEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/description.type.schemaUri/275'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'LanguageSchemaURIEnum': EnumDefinition({
      'name': 'LanguageSchemaURIEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/description.language.schemaUri/240'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'AccessTypeIdEnum': EnumDefinition({
      'name': 'AccessTypeIdEnum',
      'title': 'Controlled list of RAiD access type id values.',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'is_a': 'AbstractRaidDynamicEnum',
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/access.type.schemaUri/208'],
          'relationship_types': ['skos:narrower'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'AccessTypeSchemaUriEnum': EnumDefinition({
      'name': 'AccessTypeSchemaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/access.type.schemaUri/207'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'ContributorStatusEnum': EnumDefinition({
      'name': 'ContributorStatusEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'permissible_values': {'UNVERIFIED': PermissibleValue({'text': 'UNVERIFIED'})}
    }),
    'ContributorSchenaUriEnum': EnumDefinition({
      'name': 'ContributorSchenaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/contributor.schemaUri/215'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'ContributorPositionSchemaUriEnum': EnumDefinition({
      'name': 'ContributorPositionSchemaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/contributor.position.schemaUri/277'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'ContributorPositionIdEnum': EnumDefinition({
      'name': 'ContributorPositionIdEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/contributor.position.schemaUri/306'],
          'relationship_types': ['skos:narrower'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'ContributorRoleSchemaUriEnum': EnumDefinition({
      'name': 'ContributorRoleSchemaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/contributor.role.schemaUri/165'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'ContributorRoleIdEnum': EnumDefinition({
      'name': 'ContributorRoleIdEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/contributor.role.schemaUri/166'],
          'relationship_types': ['skos:narrower'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'OrganizationSchemaUriEnum': EnumDefinition({
      'name': 'OrganizationSchemaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/organisation.schemaUri/158'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'OrganizationRoleSchemaUriEnum': EnumDefinition({
      'name': 'OrganizationRoleSchemaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/organisation.role.schemaUri/281'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'OrganizationRoleIdEnum': EnumDefinition({
      'name': 'OrganizationRoleIdEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/organisation.schemaUri/282'],
          'relationship_types': ['skos:narrower'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'RelatedRaidTypeSchemaUriEnum': EnumDefinition({
      'name': 'RelatedRaidTypeSchemaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/relatedRaid.type.schemaUri/285'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'RelatedRaidTypeIdEnum': EnumDefinition({
      'name': 'RelatedRaidTypeIdEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/relatedRaid.type.schemaUri/286'],
          'relationship_types': ['skos:narrower'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'RelatedObjectSchemaUriEnum': EnumDefinition({
      'name': 'RelatedObjectSchemaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/relatedObject.schemaUri/218'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'RelatedObjectTypeSchemaUriEnum': EnumDefinition({
      'name': 'RelatedObjectTypeSchemaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/relatedObject.type.schemaUri/283'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'RelatedObjectTypeIdEnum': EnumDefinition({
      'name': 'RelatedObjectTypeIdEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/relatedObject.type.schemaUri/284'],
          'relationship_types': ['skos:narrower'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'RelatedObjectCategorySchemaUriEnum': EnumDefinition({
      'name': 'RelatedObjectCategorySchemaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/relatedObject.category.schemaUri/386'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'RelatedObjectCategoryIdEnum': EnumDefinition({
      'name': 'RelatedObjectCategoryIdEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/raid_placeholder/387'],
          'relationship_types': ['skos:narrower'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'SubjectSchemaURIEnum': EnumDefinition({
      'name': 'SubjectSchemaURIEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/subject.schemaUri/193'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    }),
    'SpatialCoverageSchemaUriEnum': EnumDefinition({
      'name': 'SpatialCoverageSchemaUriEnum',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'reachable_from': ReachabilityQuery({
          'source_ontology': 'https://vocabs.ardc.edu.au/repository/api/sparql/raid_research-activity-identifier-raid-controlled-lists_raid-cl-v1-1',
          'source_nodes': ['https://vocabulary.raid.org/spatialCoverage.schemaUri/167'],
          'relationship_types': ['skos:hasTopConcept'],
          'is_direct': True,
          'include_self': False,
          'traverse_up': False
        })
    })},
  'slots': {'subject': SlotDefinition({
      'name': 'subject',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'range': 'Subject',
      'multivalued': True,
      'inlined_as_list': True
    }),
    'spatialCoverage': SlotDefinition({
      'name': 'spatialCoverage',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'range': 'SpatialCoverage',
      'multivalued': True,
      'inlined_as_list': True
    }),
    'type': SlotDefinition({
      'name': 'type',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'range': 'string'
    }),
    'url': SlotDefinition({
      'name': 'url',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'range': 'string'
    }),
    'id': SlotDefinition({
      'name': 'id',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'identifier': True,
      'range': 'string'
    }),
    'text': SlotDefinition({
      'name': 'text',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'range': 'string'
    }),
    'startDate': SlotDefinition({
      'name': 'startDate',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'range': 'string',
      'required': True
    }),
    'endDate': SlotDefinition({
      'name': 'endDate',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'range': 'string'
    }),
    'language': SlotDefinition({
      'name': 'language',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'rank': 1000,
      'range': 'Language'
    })},
  'classes': {'Subject': ClassDefinition({
      'name': 'Subject',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'attributes': {'id': SlotDefinition({
          'name': 'id',
          'from_schema': 'https://raid.org/datamodel/api/raid/extended',
          'range': 'string'
        }),
        'schemaUri': SlotDefinition({
          'name': 'schemaUri',
          'from_schema': 'https://raid.org/datamodel/api/raid/extended',
          'rank': 1000,
          'range': 'SubjectSchemaURIEnum'
        }),
        'keyword': SlotDefinition({
          'name': 'keyword',
          'from_schema': 'https://raid.org/datamodel/api/raid/extended',
          'rank': 1000,
          'range': 'SubjectKeyword',
          'multivalued': True,
          'inlined_as_list': True
        })}
    }),
    'SpatialCoverage': ClassDefinition({
      'name': 'SpatialCoverage',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'attributes': {'id': SlotDefinition({
          'name': 'id',
          'from_schema': 'https://raid.org/datamodel/api/raid/extended',
          'range': 'string'
        }),
        'schemaUri': SlotDefinition({
          'name': 'schemaUri',
          'from_schema': 'https://raid.org/datamodel/api/raid/extended',
          'range': 'SpatialCoverageSchemaUriEnum'
        }),
        'place': SlotDefinition({
          'name': 'place',
          'from_schema': 'https://raid.org/datamodel/api/raid/extended',
          'rank': 1000,
          'range': 'SpatialCoveragePlace',
          'multivalued': True,
          'inlined_as_list': True
        })}
    }),
    'SubjectKeyword': ClassDefinition({
      'name': 'SubjectKeyword',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'slots': ['text', 'language']
    }),
    'SpatialCoveragePlace': ClassDefinition({
      'name': 'SpatialCoveragePlace',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'slots': ['text', 'language']
    }),
    'TraditionalKnowledgeLabel': ClassDefinition({
      'name': 'TraditionalKnowledgeLabel',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'attributes': {'id': SlotDefinition({
          'name': 'id',
          'from_schema': 'https://raid.org/datamodel/api/raid/extended',
          'range': 'string'
        }),
        'schemaUri': SlotDefinition({
          'name': 'schemaUri',
          'from_schema': 'https://raid.org/datamodel/api/raid/extended',
          'range': 'string'
        })}
    }),
    'Language': ClassDefinition({
      'name': 'Language',
      'from_schema': 'https://raid.org/datamodel/api/raid/extended',
      'attributes': {'id': SlotDefinition({
          'name': 'id',
          'from_schema': 'https://raid.org/datamodel/api/raid/shared',
          'range': 'string'
        }),
        'schemaUri': SlotDefinition({
          'name': 'schemaUri',
          'from_schema': 'https://raid.org/datamodel/api/raid/shared',
          'range': 'LanguageSchemaURIEnum'
        })}
    })},
  'source_file': 'v2/raid-extended.yaml'
})