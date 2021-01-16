var color = "gray";
var len = undefined;

var nodes = [
    //type
    { id: 'CA_Prof'         , label: "Professional"   , group: 'type' },
    { id: 'CA_Per'          , label: "Personal"       , group: 'type' },
    //{ id: 'CA_EDU'          , label: "Educational"    , group: 'type' },

    //skills
    { id: 'SK_MechCAD'      , label: "Mechanical CAD"   , group: 'skill' },
    { id: 'SK_3DMod'        , label: "3D Modeling"      , group: 'skill' },
    { id: 'SK_Paint'        , label: "Painting"         , group: 'skill' },
    { id: 'SK_Carp'         , label: "Wood Working"     , group: 'skill' },
    { id: 'SK_Busin'        , label: "Business"         , group: 'skill' },
    { id: 'SK_OEM'          , label: "OEM Manufacturing", group: 'skill' },
    { id: 'SK_3DPrint'      , label: "3D Printing"      , group: 'skill' },
    { id: 'SK_MetWork'      , label: "Metal Working"    , group: 'skill' },
    { id: 'SK_DigArt'       , label: "Digital Art"      , group: 'skill' },
    { id: 'CO_Assm'         , label: "Assembly"         , group: 'code' },
    { id: 'CO_C'            , label: "C"                , group: 'code' },
    { id: 'CO_Java'         , label: "Java"             , group: 'code' },
    { id: 'CO_Kotlin'       , label: "Kotlin"           , group: 'code' },
    { id: 'CO_API'          , label: "API Interface"    , group: 'code' },
    { id: 'CO_Prod'         , label: "Production Deployment", group: 'code' },
    { id: 'CO_UxUe'         , label: "UX/UE"            , group: 'code' },
    { id: 'CO_Csharp'       , label: "C#"               , group: 'code' },
    { id: 'CO_Python'       , label: "Python"           , group: 'code' },
    { id: 'CO_ADK'          , label: "ADK"              , group: 'code' },
    { id: 'CO_XML'          , label: "XML"              , group: 'code' },
    { id: 'CO_SQL'          , label: "SQL"              , group: 'code' },
    { id: 'CO_GL'           , label: "OpenGL"           , group: 'code' },
    { id: 'EE_Embed'        , label: "EE-Embedded"      , group: 'ee' },
    { id: 'EE_Power'        , label: "EE-Power"         , group: 'ee' },
    { id: 'EE_DSP'          , label: "EE-DSP"           , group: 'ee' },
    { id: 'EE_ASP'          , label: "EE-ASP"           , group: 'ee' },
    { id: 'EE_Wireless'     , label: "EE-Wireless"      , group: 'ee' },
    { id: 'EE_Design'       , label: "EE-PCBDesign"     , group: 'ee' },
    { id: 'EE_RTC'          , label: "EE-RT Compute"    , group: 'ee' },
    
    
    
    
   
    //projects
    { id: 'PR_TotName'      , label: "Totoro Nameplate" , group: 'proj' },
    { id: 'PR_Cabnet'       , label: "Cabnet"           , group: 'proj' },
    { id: 'PR_MimicPin'     , label: "Mimic Pin"        , group: 'proj' },
    { id: 'PR_3DCatan'      , label: "3D Catan"         , group: 'proj' },
    { id: 'PR_MarkHold'     , label: "Marker Holder"    , group: 'proj' },
    { id: 'PR_Pikachu'      , label: "Pikachu Fig"      , group: 'proj' },
    { id: 'PR_SoldHold'     , label: "Solder Holder"    , group: 'proj' },
    { id: 'PR_Crowbar'      , label: "Half-life Crowbar", group: 'proj' },
    { id: 'PR_MarioPot'     , label: "Mario Flower Pot" , group: 'proj' },
    { id: 'PR_DaffyFrame'   , label: "Daffy & Marvin Frame" , group: 'proj' },
    { id: 'PR_WallLight'    , label: "Wall Light"       , group: 'proj' },
    { id: 'PR_AutoBlinds'   , label: "Auto Blinds"      , group: 'proj' },
    { id: 'PR_SpaceMarine'  , label: "Space Marine"     , group: 'proj' },
    { id: 'PR_KeyLOC'       , label: "Kicker KeyLOC"    , group: 'proj' },
    { id: 'PR_KConnect'     , label: "Kicker Connect"   , group: 'proj' },
    { id: 'PR_KU'           , label: "KickerU"          , group: 'proj' },
    { id: 'PR_KFT'          , label: "Kicker FlexTune"  , group: 'proj' },
    
        
    
    
    
];
var edges = [
    
    //catagory
    { from: 'CA_Prof', to: 'PR_KFT'},
    { from: 'CA_Prof', to: 'PR_KU'},
    { from: 'CA_Prof', to: 'PR_KConnect'},
    { from: 'CA_Prof', to: 'PR_KeyLOC'},
    
    { from: 'CA_Per', to: 'PR_SpaceMarine'},
    { from: 'CA_Per', to: 'PR_AutoBlinds'},
    { from: 'CA_Per', to: 'PR_WallLight'},
    { from: 'CA_Per', to: 'PR_DaffyFrame'},
    { from: 'CA_Per', to: 'PR_MarioPot'},
    { from: 'CA_Per', to: 'PR_Crowbar'},
    { from: 'CA_Per', to: 'PR_SoldHold'},
    { from: 'CA_Per', to: 'PR_Pikachu'},
    { from: 'CA_Per', to: 'PR_MarkHold'},
    { from: 'CA_Per', to: 'PR_3DCatan'},
    { from: 'CA_Per', to: 'PR_MimicPin'},
    { from: 'CA_Per', to: 'PR_Cabnet'},
    { from: 'CA_Per', to: 'PR_TotName'},
    
    
    
    
    //kicker connect
    { from: 'PR_KConnect', to: 'CO_Java'},
    { from: 'PR_KConnect', to: 'CO_API'},
    { from: 'PR_KConnect', to: 'CO_ADK'},
    { from: 'PR_KConnect', to: 'CO_UxUe'},
    { from: 'PR_KConnect', to: 'CO_Prod'},
    { from: 'PR_KConnect', to: 'CO_XML'},
    //kicker u
    { from: 'PR_KU', to: 'CO_Java'},
    { from: 'PR_KU', to: 'CO_API'},
    { from: 'PR_KU', to: 'CO_ADK'},
    { from: 'PR_KU', to: 'CO_UxUe'},
    { from: 'PR_KU', to: 'CO_Prod'},
    { from: 'PR_KU', to: 'CO_XML'},
    { from: 'PR_KU', to: 'CO_SQL'},
    { from: 'PR_KU', to: 'CO_GL'},
    //kicker flextune
    { from: 'PR_KFT', to: 'CO_Java'},
    { from: 'PR_KFT', to: 'CO_API'},
    { from: 'PR_KFT', to: 'CO_ADK'},
    { from: 'PR_KFT', to: 'CO_UxUe'},
    { from: 'PR_KFT', to: 'CO_Prod'},
    { from: 'PR_KFT', to: 'CO_XML'},
    { from: 'PR_KFT', to: 'CO_Kotlin'},
    //KeyLOC
    { from: 'PR_KeyLOC', to: 'EE_Embed'},
    { from: 'PR_KeyLOC', to: 'EE_Power'},
    { from: 'PR_KeyLOC', to: 'EE_DSP'},
    { from: 'PR_KeyLOC', to: 'EE_ASP'},
    { from: 'PR_KeyLOC', to: 'EE_Design'},
    { from: 'PR_KeyLOC', to: 'EE_RTC'},
    { from: 'PR_KeyLOC', to: 'CO_Prod'},
    { from: 'PR_KeyLOC', to: 'CO_C'},
    { from: 'PR_KeyLOC', to: 'CO_API'},
    { from: 'PR_KeyLOC', to: 'CO_Assm'},
    { from: 'PR_KeyLOC', to: 'SK_OEM'},
    { from: 'PR_KeyLOC', to: 'SK_Busin'},
    { from: 'PR_KeyLOC', to: 'SK_MechCAD'},
    { from: 'PR_KeyLOC', to: 'CO_UxUe'},
    { from: 'PR_KeyLOC', to: 'CO_Csharp'},
    { from: 'PR_KeyLOC', to: 'CO_Python'},
    //space marine
    { from: 'PR_SpaceMarine', to: 'SK_Paint' },
    //auto blinds 
    { from: 'PR_AutoBlinds', to: 'SK_MechCAD'},
    { from: 'PR_AutoBlinds', to: 'SK_3DPrint'},
    { from: 'PR_AutoBlinds', to: 'EE_Power'},
    { from: 'PR_AutoBlinds', to: 'CO_API'},
    { from: 'PR_AutoBlinds', to: 'CO_C'},
    //wall light 
    { from: 'PR_WallLight', to: 'SK_MechCAD'},
    { from: 'PR_WallLight', to: 'SK_3DPrint'},
    { from: 'PR_WallLight', to: 'SK_OEM'},
    { from: 'PR_WallLight', to: 'EE_Embed'},
    { from: 'PR_WallLight', to: 'EE_Power'},
    { from: 'PR_WallLight', to: 'EE_Wireless'},
    { from: 'PR_WallLight', to: 'EE_Design'},
    { from: 'PR_WallLight', to: 'CO_Assm'},
    { from: 'PR_WallLight', to: 'CO_C'},
    //totoro nameplate
    { from: 'PR_TotName', to: 'SK_3DMod' },
    { from: 'PR_TotName', to: 'SK_Paint' },
    { from: 'PR_TotName', to: 'SK_3DPrint' },
    { from: 'PR_TotName', to: 'SK_MechCAD' },
    { from: 'PR_TotName', to: 'SK_DigArt' },
    //cabnet
    { from: 'PR_Cabnet', to: 'SK_MechCAD' },
    { from: 'PR_Cabnet', to: 'SK_Carp' },
    //mimic lapel pin
    { from: 'PR_MimicPin', to: 'SK_OEM' },
    { from: 'PR_MimicPin', to: 'SK_DigArt' },
    { from: 'PR_MimicPin', to: 'SK_Busin' },
    //3d catan
    { from: 'PR_3DCatan', to: 'SK_Paint' },
    { from: 'PR_3DCatan', to: 'SK_3DPrint' },
    { from: 'PR_3DCatan', to: 'SK_3DMod' },
    //pika
    { from: 'PR_Pikachu', to: 'SK_Paint' },
    { from: 'PR_Pikachu', to: 'SK_3DPrint' },
    //solder holder
    { from: 'PR_SoldHold', to: 'SK_MechCAD' },
    { from: 'PR_SoldHold', to: 'SK_3DPrint' },
    //marker holder
    { from: 'PR_MarkHold', to: 'SK_MechCAD' },
    { from: 'PR_MarkHold', to: 'SK_3DPrint' },
    //half life crowbar
    { from: 'PR_Crowbar', to: 'SK_3DPrint' },
    { from: 'PR_Crowbar', to: 'SK_MechCAD' },
    { from: 'PR_Crowbar', to: 'SK_Paint'},
    { from: 'PR_Crowbar', to: 'SK_MetWork'},
    //mario flower pot
    { from: 'PR_MarioPot', to: 'SK_MechCAD'},
    { from: 'PR_MarioPot', to: 'SK_3DPrint'},
    { from: 'PR_MarioPot', to: 'SK_Paint'},
    //daffy marvin frame 
    { from: 'PR_DaffyFrame', to: 'SK_Paint'},
    { from: 'PR_DaffyFrame', to: 'SK_3DPrint'},
];

// create a network
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {
    autoResize: true,
    width:'100%',
    height:'100%',
    layout: {
        improvedLayout: true,
        hierarchical: {
            enabled: true,
            nodeSpacing: 120,
            levelSeparation: 300,
            direction: 'lr',
            sortMethod: 'directed',
            shakeTowards: 'roots',
        },
    },
    groups: {
        'skill': {color:{background:'green'}, borderWidth:2},
        'proj' : {color:{background:'blue' }, borderWidth:2},
        'ee'   : {color:{background:'yellow'}, borderWidth:2},
        'code' : {color:{background:'aqua' }, borderWidth:2},
        'type' : {color:{background:'white'}, borderWidth:2},
    },
    nodes: {
        shape: "dot",
        size: 30,
        borderWidth: 2,
        fixed: true,
        font: {
            size: 24,
            color: "#ffffff",
            strokeWidth: 10,
            strokeColor: "#000000",
        },
    },
    edges: {
        smooth: {
            type: "cubicBezier",
            forceDirection: "horizontal",
            roundness: .8,
        },
        color: {
            color:'#000088',
            highlight:'#ffffff',
            hover: '#0000ff',
            inherit: false,
            opacity:1.0
        },
        length:400,
        width: 1,
        selectionWidth: 5,
    },
    physics:{
        enabled:false,
//        hierarchicalRepulsion: {
//          centralGravity: 0.0,
//          springLength: 100,
//          springConstant: 0.001,
//          nodeDistance: 120,
//          damping: 0.09,
//          avoidOverlap: 0
//        },
    }
};
network = new vis.Network(container, data, options);