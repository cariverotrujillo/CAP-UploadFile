using PadronSrv as service from '../../srv/padron';
annotate service.Padron with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'cuit',
                Value : cuit,
            },
            {
                $Type : 'UI.DataField',
                Label : 'fecha_p',
                Value : fecha_p,
            },
            {
                $Type : 'UI.DataField',
                Label : 'fecha_v',
                Value : fecha_v,
            },
            {
                $Type : 'UI.DataField',
                Label : 'fecha_f',
                Value : fecha_f,
            },
            {
                $Type : 'UI.DataField',
                Label : 'tipo',
                Value : tipo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'alta',
                Value : alta,
            },
            {
                $Type : 'UI.DataField',
                Label : 'cambio',
                Value : cambio,
            },
            {
                $Type : 'UI.DataField',
                Label : 'qsatz_p',
                Value : qsatz_p,
            },
            {
                $Type : 'UI.DataField',
                Label : 'qsatz_r',
                Value : qsatz_r,
            },
            {
                $Type : 'UI.DataField',
                Label : 'grupo_p',
                Value : grupo_p,
            },
            {
                $Type : 'UI.DataField',
                Label : 'grupo_r',
                Value : grupo_r,
            },
            {
                $Type : 'UI.DataField',
                Label : 'razon_social',
                Value : razon_social,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'fecha_f',
            Value : fecha_f,
        },
        {
            $Type : 'UI.DataField',
            Label : 'fecha_v',
            Value : fecha_v,
        },
        {
            $Type : 'UI.DataField',
            Label : 'fecha_p',
            Value : fecha_p,
        },
        {
            $Type : 'UI.DataField',
            Label : 'cuit',
            Value : cuit,
        },
        {
            $Type : 'UI.DataField',
            Label : 'tipo',
            Value : tipo,
        },
    ],
);

