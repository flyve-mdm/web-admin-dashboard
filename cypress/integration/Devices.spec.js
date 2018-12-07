import '../../public/config'

describe('Devices', () => {
  beforeEach(() => {
    cy.server()

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmAgent/?uid_cols=true&forcedisplay[0]=2&forcedisplay[1]=3&forcedisplay[2]=4&forcedisplay[3]=12&order=ASC&range=0-14&`,
      response: {
        totalcount: 4,
        count: 4,
        sort: 1,
        order: 'ASC',
        data: [
          {
            'PluginFlyvemdmAgent.name': 'device1@teclib.com', 'PluginFlyvemdmAgent.id': 221, 'PluginFlyvemdmAgent.PluginFlyvemdmFleet.name': 'not managed fleet', 'PluginFlyvemdmAgent.Computer.id': 916, 'PluginFlyvemdmAgent.mdm_type': 'android',
          },
          {
            'PluginFlyvemdmAgent.name': 'device2@teclib.com', 'PluginFlyvemdmAgent.id': 234, 'PluginFlyvemdmAgent.PluginFlyvemdmFleet.name': 'MyFleet', 'PluginFlyvemdmAgent.Computer.id': 216, 'PluginFlyvemdmAgent.mdm_type': 'android',
          },
        ],
        'content-range': '0-3/4',
      },
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/Item_DeviceSimcard/?range=0-0&`,
      response: {"totalcount":1,"count":1,"sort":1,"order":"ASC","data":[{"80":"Root entity"}],"content-range":"0-0/1"},
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/Item_DeviceSimcard/?searchText[itemtype]=Computer&searchText[items_id]=221`,
      response: [{"id":22,"items_id":0,"itemtype":"","devicesimcards_id":23,"is_deleted":0,"is_dynamic":0,"entities_id":0,"is_recursive":0,"serial":null,"otherserial":null,"states_id":0,"locations_id":0,"lines_id":24,"pin":"","pin2":"","puk":"","puk2":"","msin":"","links":[{"rel":"DeviceSimcard","href":"https://dev.flyve.org/glpi/apirest.php/DeviceSimcard/23"},{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"},{"rel":"Line","href":"https://dev.flyve.org/glpi/apirest.php/Line/24"},{"rel":"Contract_Item","href":"https://dev.flyve.org/glpi/apirest.php/Item_DeviceSimcard/22/Contract_Item/"}]}],
    })


    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/getMultipleItems?items[0][itemtype]=Line&items[0][items_id]=24&`,
      response: [{"id":24,"name":584164326767,"entities_id":0,"is_recursive":0,"is_deleted":0,"caller_num":"","caller_name":"","users_id":0,"groups_id":0,"lineoperators_id":0,"locations_id":0,"states_id":0,"linetypes_id":0,"date_creation":"2018-12-07 18:00:20","date_mod":"2018-12-07 18:00:20","comment":null,"links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"},{"rel":"Document_Item","href":"https://dev.flyve.org/glpi/apirest.php/Line/24/Document_Item/"},{"rel":"Contract_Item","href":"https://dev.flyve.org/glpi/apirest.php/Line/24/Contract_Item/"},{"rel":"Infocom","href":"https://dev.flyve.org/glpi/apirest.php/Line/24/Infocom/"},{"rel":"Item_Ticket","href":"https://dev.flyve.org/glpi/apirest.php/Line/24/Item_Ticket/"}]}],
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/getGlpiConfig`,
      response: {
        cfg_glpi: {
          password_min_length: 10,
          password_need_number: 1,
          password_need_letter: 1,
          password_need_caps: 1,
          password_need_symbol: 1,
          url_base: 'https://your-url.com/glpi',
        },
      },
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/PluginFlyvemdmAgent/221`,
      response: {
        id: 221, name: 'device1@teclib.com', version: '2.0.1-beta', computers_id: 916, users_id: 580, wipe: 0, lock: 0, enroll_status: 'enrolled', entities_id: 0, plugin_flyvemdm_fleets_id: 1, last_report: null, last_contact: '2018-05-24 16:52:48', is_online: 1, certificate: '', mdm_type: 'android', has_system_permission: 0, api_token: '9VYCtZSxH5Xa01tWvlTEQWG3YRc7Fq3DZIXn7JsB', links: [{ rel: 'Computer', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916' }, { rel: 'User', href: 'https://dev.flyve.org/glpi/apirest.php/User/580' }, { rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }, { rel: 'PluginFlyvemdmFleet', href: 'https://dev.flyve.org/glpi/apirest.php/PluginFlyvemdmFleet/1' }],
      },
    })


    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmFleet/?forcedisplay[0]=2&`,
      response: {
        totalcount: 12, count: 12, sort: 1, order: 'ASC', data: [{ 1: 'demo fleet', 2: 58 }, { 1: 'DIOHz0r Tests', 2: 173 }, { 1: 'Files&Apk', 2: 57 }, { 1: 'fleet', 2: 61 }, { 1: 'FlyveDevMcy', 2: 52 }, { 1: 'Multiple file', 2: 59 }, { 1: 'MyFleet', 2: 196 }, { 1: 'New Fleet', 2: 199 }, { 1: 'New Fleet copy', 2: 200 }, { 1: 'not managed fleet', 2: 1 }, { 1: 'Policies test', 2: 60 }, { 1: 'test', 2: 68 }], 'content-range': '0-11/12',
      },
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/PluginFlyvemdmFleet/1?`,
      response: {
        id: 1, name: 'not managed fleet', entities_id: 0, is_recursive: 1, is_default: 1, links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      },
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/Computer/916?expand_dropdowns=true&with_devices=true&with_disks=true&with_softwares=true&with_connections=true&with_networkports=true&`,
      response: {
        id: 916,
        entities_id: 'Root entity',
        name: 'Android SDK built for x86',
        serial: 'Unknown',
        otherserial: null,
        contact: 'android-build',
        contact_num: null,
        users_id_tech: 0,
        groups_id_tech: 0,
        comment: null,
        date_mod: '2018-05-24 16:45:24',
        autoupdatesystems_id: 0,
        locations_id: 0,
        domains_id: 0,
        networks_id: 0,
        computermodels_id: 'Android SDK built for x86',
        computertypes_id: 'Mobile device',
        is_template: 0,
        template_name: null,
        manufacturers_id: 0,
        is_deleted: 1,
        is_dynamic: 1,
        users_id: 'pspntzlm@hi2.in',
        groups_id: 0,
        states_id: 0,
        ticket_tco: 0,
        uuid: '4c0317c37d4ddbd8',
        date_creation: '2018-01-31 20:36:42',
        is_recursive: 0,
        _devices: {
          Item_DeviceFirmware: {
            1995: {
              id: 1995, devicefirmwares_id: 293, is_dynamic: 1, entities_id: 0, is_recursive: 0, serial: '', otherserial: null, locations_id: 0, states_id: 0, links: [{ rel: 'DeviceFirmware', href: 'https://dev.flyve.org/glpi/apirest.php/DeviceFirmware/293' }, { rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
            },
          },
          Item_DeviceProcessor: {
            7952: {
              id: 7952, deviceprocessors_id: 0, frequency: 1555, serial: '', is_dynamic: 1, nbcores: 0, nbthreads: 0, entities_id: 0, is_recursive: 0, busID: null, otherserial: null, locations_id: 0, states_id: 0, links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
            },
          },
          Item_DeviceMemory: {
            2546: {
              id: 2546, devicememories_id: 2546, size: 2799, serial: '', is_dynamic: 1, entities_id: 0, is_recursive: 0, busID: '', otherserial: null, locations_id: 0, states_id: 0, links: [{ rel: 'DeviceMemory', href: 'https://dev.flyve.org/glpi/apirest.php/DeviceMemory/2546' }, { rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
            },
          },
          Item_DeviceBattery: {
            2872: {
              id: 2872, devicebatteries_id: 110, manufacturing_date: null, is_dynamic: 1, entities_id: 0, is_recursive: 0, serial: '', otherserial: null, locations_id: 0, states_id: 0, links: [{ rel: 'DeviceBattery', href: 'https://dev.flyve.org/glpi/apirest.php/DeviceBattery/110' }, { rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
            },
          },
        },
        _disks: [{
          name: {
            fsname: null, id: 89113, entities_id: 0, name: '/data/cache', device: '/data/cache', mountpoint: null, filesystems_id: 0, totalsize: 25610, freesize: 5013, is_dynamic: 1, date_mod: '2018-06-15 12:19:02', date_creation: '2018-06-15 12:19:02', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
          },
        }, {
          name: {
            fsname: null, id: 89112, entities_id: 0, name: '/data', device: '/data', mountpoint: null, filesystems_id: 0, totalsize: 25610, freesize: 5013, is_dynamic: 1, date_mod: '2018-06-15 12:19:02', date_creation: '2018-06-15 12:19:02', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
          },
        }, {
          name: {
            fsname: null, id: 89111, entities_id: 0, name: '/storage/emulated/0', device: '/storage/emulated/0', mountpoint: null, filesystems_id: 0, totalsize: 25610, freesize: 5013, is_dynamic: 1, date_mod: '2018-06-15 12:19:02', date_creation: '2018-06-15 12:19:02', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
          },
        }, {
          name: {
            fsname: null, id: 89110, entities_id: 0, name: '/system', device: '/system', mountpoint: null, filesystems_id: 0, totalsize: 3022, freesize: 1751, is_dynamic: 1, date_mod: '2018-06-15 12:19:02', date_creation: '2018-06-15 12:19:02', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
          },
        }],
        _softwares: [{
          softwarecategories_id: 0, softwares_id: 237, softwareversions_id: 1139, is_dynamic: 1, states_id: 0, is_valid: 1, links: [{ rel: 'Software', href: 'https://dev.flyve.org/glpi/apirest.php/Software/237' }, { rel: 'SoftwareVersion', href: 'https://dev.flyve.org/glpi/apirest.php/SoftwareVersion/1139' }],
        }],
        _connections: [],
        _networkports: {
          NetworkPortEthernet: [{
            netport_id: 1709,
            entities_id: 0,
            is_recursive: 0,
            logical_number: 1,
            name: '',
            mac: '02:00:00:00:00:00',
            comment: null,
            is_dynamic: 1,
            id: 1709,
            networkports_id: 1709,
            items_devicenetworkcards_id: 0,
            netpoints_id: 0,
            type: '',
            speed: -1,
            date_mod: '2018-06-09 14:37:53',
            date_creation: '2018-06-09 14:37:53',
            NetworkName: {
              id: 1709, name: null, fqdns_id: 0, FQDN: { id: 0, name: null, fqdn: null }, IPAddress: [{ id: '', name: null, IPNetwork: [] }],
            },
            links: [{ rel: 'UNKNOWN', href: 'https://dev.flyve.org/glpi/apirest.php/UNKNOWN/1709' }, { rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }, { rel: 'NetworkPort', href: 'https://dev.flyve.org/glpi/apirest.php/NetworkPort/1709' }],
          }],
        },
        links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }, { rel: 'ComputerModel', href: 'https://dev.flyve.org/glpi/apirest.php/ComputerModel/8' }, { rel: 'ComputerType', href: 'https://dev.flyve.org/glpi/apirest.php/ComputerType/1' }, { rel: 'User', href: 'https://dev.flyve.org/glpi/apirest.php/User/579' }, { rel: 'ReservationItem', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/ReservationItem/' }, { rel: 'Document_Item', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Document_Item/' }, { rel: 'Contract_Item', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Contract_Item/' }, { rel: 'Infocom', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Infocom/' }, { rel: 'Item_Ticket', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_Ticket/' }, { rel: 'Item_Project', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_Project/' }, { rel: 'NetworkPort', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/NetworkPort/' }, { rel: 'Item_DeviceMotherboard', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceMotherboard/' }, { rel: 'Item_DeviceFirmware', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceFirmware/' }, { rel: 'Item_DeviceProcessor', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceProcessor/' }, { rel: 'Item_DeviceMemory', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceMemory/' }, { rel: 'Item_DeviceHardDrive', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceHardDrive/' }, { rel: 'Item_DeviceNetworkCard', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceNetworkCard/' }, { rel: 'Item_DeviceDrive', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceDrive/' }, { rel: 'Item_DeviceBattery', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceBattery/' }, { rel: 'Item_DeviceGraphicCard', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceGraphicCard/' }, { rel: 'Item_DeviceSoundCard', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceSoundCard/' }, { rel: 'Item_DeviceControl', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceControl/' }, { rel: 'Item_DevicePci', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DevicePci/' }, { rel: 'Item_DeviceCase', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceCase/' }, { rel: 'Item_DevicePowerSupply', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DevicePowerSupply/' }, { rel: 'Item_DeviceGeneric', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceGeneric/' }, { rel: 'Item_DeviceSimcard', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceSimcard/' }, { rel: 'Item_DeviceSensor', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceSensor/' }],
      },
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/Software/?metacriteria[0][link]=AND&metacriteria[0][itemtype]=Computer&metacriteria[0][field]=2&metacriteria[0][searchtype]=equals&metacriteria[0][value]=916&uid_cols=true&forcedisplay[0]=2&`,
      response: {
        totalcount: 1, count: 1, sort: 1, order: 'ASC', data: [{ 'Software.name': 'Android', 'Software.Entity.completename': 'Root entity', 'Software.id': 916 }], 'content-range': '0-0/1',
      },
    })

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/search/Software/?metacriteria[0][link]=AND&metacriteria[0][itemtype]=Computer&metacriteria[0][field]=2&metacriteria[0][searchtype]=equals&metacriteria[0][value]=916&uid_cols=true&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=19&`,
      response: {
        totalcount: 1,
        count: 1,
        sort: 1,
        order: 'ASC',
        data: [{
          'Software.name': 'Android', 'Software.Entity.completename': 'Root entity', 'Software.id': 916, 'Software.date_mod': '2017-06-30 18:23:52',
        }],
        'content-range': '0-0/1',
      },
    })

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmAgent/?criteria[0][link]=and&criteria[0][field]=3&criteria[0][searchtype]=contains&criteria[0][value]=New Fleet&`,
      response: {
        totalcount: 0, count: 0, sort: 1, order: 'ASC', 'content-range': '0--1/0',
      },
    }).as('polices1')

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmPolicy/?uid_cols=true&range=0-0&`,
      response: {
        totalcount: 42, count: 1, sort: 1, order: 'ASC', data: [{ 'PluginFlyvemdmPolicy.name': 'Audio profile mode' }], 'content-range': '0-0/42',
      },
    }).as('polices2')

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmPolicy/?uid_cols=true&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=3&forcedisplay[3]=4&forcedisplay[4]=5&forcedisplay[5]=6&forcedisplay[6]=7&forcedisplay[7]=8&forcedisplay[8]=9&forcedisplay[9]=10&forcedisplay[10]=11&forcedisplay[11]=12&forcedisplay[12]=13&range=0-42&`,
      response: {
        totalcount: 42,
        count: 42,
        sort: 1,
        order: 'ASC',
        data: [{
          'PluginFlyvemdmPolicy.name': 'Audio profile mode', 'PluginFlyvemdmPolicy.id': 55, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Configuration > User interface', 'PluginFlyvemdmPolicy.type': 'dropdown', 'PluginFlyvemdmPolicy.type_data': '{"RINGER_MODE_NORMAL":"Normal","RINGER_MODE_SILENT":"Silent","RINGER_MODE_VIBRATE":"Vibrate"}', 'PluginFlyvemdmPolicy.group': 'ui', 'PluginFlyvemdmPolicy.default_value': 'RINGER_MODE_NORMAL', 'PluginFlyvemdmPolicy.recommended_value': 'RINGER_MODE_NORMAL', 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Deploy application', 'PluginFlyvemdmPolicy.id': 14, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Deployment', 'PluginFlyvemdmPolicy.type': 'deployapp', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'application', 'PluginFlyvemdmPolicy.default_value': '', 'PluginFlyvemdmPolicy.recommended_value': '', 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 4.3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Deploy file', 'PluginFlyvemdmPolicy.id': 16, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Deployment', 'PluginFlyvemdmPolicy.type': 'deployfile', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'file', 'PluginFlyvemdmPolicy.default_value': '', 'PluginFlyvemdmPolicy.recommended_value': '', 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 4.2, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable accessibility sounds', 'PluginFlyvemdmPolicy.id': 51, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Configuration > User interface', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'ui', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable airplane mode', 'PluginFlyvemdmPolicy.id': 33, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 4.2, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable alarm sounds', 'PluginFlyvemdmPolicy.id': 49, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Configuration > User interface', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'ui', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable Bluetooth', 'PluginFlyvemdmPolicy.id': 19, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 2, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable Camera', 'PluginFlyvemdmPolicy.id': 13, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'camera', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 4, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable DTMF sounds', 'PluginFlyvemdmPolicy.id': 52, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Configuration > User interface', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'ui', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable GPS', 'PluginFlyvemdmPolicy.id': 20, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 1.5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable hotspot and tethering', 'PluginFlyvemdmPolicy.id': 29, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable media sounds', 'PluginFlyvemdmPolicy.id': 47, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Configuration > User interface', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'ui', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable Mobile line', 'PluginFlyvemdmPolicy.id': 24, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable NFC', 'PluginFlyvemdmPolicy.id': 28, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 4.3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable notifications sounds', 'PluginFlyvemdmPolicy.id': 50, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Configuration > User interface', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'ui', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable ringer sounds', 'PluginFlyvemdmPolicy.id': 48, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Configuration > User interface', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'ui', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable roaming', 'PluginFlyvemdmPolicy.id': 21, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable screen capture', 'PluginFlyvemdmPolicy.id': 38, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > User interface', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'ui', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable speakerphone', 'PluginFlyvemdmPolicy.id': 43, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable status bar', 'PluginFlyvemdmPolicy.id': 37, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > User interface', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'ui', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 4.3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable system sounds', 'PluginFlyvemdmPolicy.id': 54, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Configuration > User interface', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'ui', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 5, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable unknown sources', 'PluginFlyvemdmPolicy.id': 46, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Deployment', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'phone', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 2.3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable USB ADB', 'PluginFlyvemdmPolicy.id': 36, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > USB', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 1, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 4.2, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable USB file transfer protocols', 'PluginFlyvemdmPolicy.id': 22, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > USB', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 0, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable USB MTP', 'PluginFlyvemdmPolicy.id': 34, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > USB', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 3.1, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable USB PTP', 'PluginFlyvemdmPolicy.id': 35, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > USB', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 1, 'PluginFlyvemdmPolicy.android_min_version': 3.1, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Disable Wifi', 'PluginFlyvemdmPolicy.id': 18, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'connectivity', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 1, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Internal Storage encryption', 'PluginFlyvemdmPolicy.id': 12, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Encryption', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'encryption', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Maximum failed password attempts for wipe', 'PluginFlyvemdmPolicy.id': 10, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'int', 'PluginFlyvemdmPolicy.type_data': '{"min":0}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 5, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Maximum time to lock (milliseconds)', 'PluginFlyvemdmPolicy.id': 11, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'int', 'PluginFlyvemdmPolicy.type_data': '{"min":0}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 60000, 'PluginFlyvemdmPolicy.recommended_value': 60000, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Minimum letters required in password', 'PluginFlyvemdmPolicy.id': 4, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'int', 'PluginFlyvemdmPolicy.type_data': '{"min":0}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Minimum lowercase letters required in password', 'PluginFlyvemdmPolicy.id': 5, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'int', 'PluginFlyvemdmPolicy.type_data': '{"min":0}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 1, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Minimum non-letter characters required in password', 'PluginFlyvemdmPolicy.id': 6, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'int', 'PluginFlyvemdmPolicy.type_data': '{"min":0}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Minimum numerical digits required in password', 'PluginFlyvemdmPolicy.id': 7, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'int', 'PluginFlyvemdmPolicy.type_data': '{"min":0}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 1, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Minimum password length', 'PluginFlyvemdmPolicy.id': 2, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'int', 'PluginFlyvemdmPolicy.type_data': '{"min":0}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 6, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Minimum symbols required in password', 'PluginFlyvemdmPolicy.id': 8, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'int', 'PluginFlyvemdmPolicy.type_data': '{"min":0}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 0, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Minimum uppercase letters required in password', 'PluginFlyvemdmPolicy.id': 9, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'int', 'PluginFlyvemdmPolicy.type_data': '{"min":0}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 0, 'PluginFlyvemdmPolicy.recommended_value': 1, 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Password enabled', 'PluginFlyvemdmPolicy.id': 1, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'dropdown', 'PluginFlyvemdmPolicy.type_data': '{"PASSWORD_NONE":"No","PASSWORD_PIN":"Pin","PASSWORD_PASSWD":"Password"}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 'PASSWORD_NONE', 'PluginFlyvemdmPolicy.recommended_value': 'PASSWORD_PIN', 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Password quality', 'PluginFlyvemdmPolicy.id': 3, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicy.type': 'dropdown', 'PluginFlyvemdmPolicy.type_data': '{"PASSWORD_QUALITY_UNSPECIFIED":"Unspecified","PASSWORD_QUALITY_SOMETHING":"Something","PASSWORD_QUALITY_NUMERIC":"Numeric","PASSWORD_QUALITY_ALPHABETIC":"Alphabetic","PASSWORD_QUALITY_ALPHANUMERIC":"Alphanumeric","PASSWORD_QUALITY_COMPLEX":"Complex"}', 'PluginFlyvemdmPolicy.group': 'policies', 'PluginFlyvemdmPolicy.default_value': 'PASSWORD_QUALITY_UNSPECIFIED', 'PluginFlyvemdmPolicy.recommended_value': 'PASSWORD_QUALITY_UNSPECIFIED', 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Remove application', 'PluginFlyvemdmPolicy.id': 15, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Deployment', 'PluginFlyvemdmPolicy.type': 'removeapp', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'application', 'PluginFlyvemdmPolicy.default_value': '', 'PluginFlyvemdmPolicy.recommended_value': '', 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 4.3, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'Remove file', 'PluginFlyvemdmPolicy.id': 17, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Deployment', 'PluginFlyvemdmPolicy.type': 'removefile', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'file', 'PluginFlyvemdmPolicy.default_value': '', 'PluginFlyvemdmPolicy.recommended_value': '', 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 4.2, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }, {
          'PluginFlyvemdmPolicy.name': 'use TLS', 'PluginFlyvemdmPolicy.id': 32, 'PluginFlyvemdmPolicy.PluginFlyvemdmPolicyCategory.completename': 'Mobile Device Management', 'PluginFlyvemdmPolicy.type': 'bool', 'PluginFlyvemdmPolicy.type_data': '""', 'PluginFlyvemdmPolicy.group': 'MDM', 'PluginFlyvemdmPolicy.default_value': '', 'PluginFlyvemdmPolicy.recommended_value': '', 'PluginFlyvemdmPolicy.is_android_system': 0, 'PluginFlyvemdmPolicy.android_min_version': 4.1, 'PluginFlyvemdmPolicy.android_max_version': 0, 'PluginFlyvemdmPolicy.apple_min_version': 0, 'PluginFlyvemdmPolicy.apple_max_version': 0,
        }],
        'content-range': '0-41/42',
      },
    }).as('polices3')

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmTask/?criteria[0][link]=and&criteria[0][field]=9&criteria[0][searchtype]=equals&criteria[0][value]=PluginFlyvemdmAgent&criteria[1][link]=and&criteria[1][field]=10&criteria[1][searchtype]=equals&criteria[1][value]=221&uid_cols=true&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=3&forcedisplay[3]=5&forcedisplay[4]=6&forcedisplay[5]=7&range=0-undefined&`,
      response: [{
        id: 3, name: 'org.fdroid.fdroid', package_name: 'org.fdroid.fdroid', alias: 'F-Droid', version: 0.97, version_code: 97050, icon: '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', filename: 'flyvemdm/package//var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var', entities_id: 0, dl_filename: '5a17683b0e006_5a17683632c270.98348587FDroid.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 6, name: 'com.uberspot.a2048', package_name: 'com.uberspot.a2048', alias: 2048, version: 2, version_code: 20, icon: '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', filename: 'flyvemdm/package//var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var', entities_id: 0, dl_filename: '5a172764898a95.5484936756fa7aa5ed741_com.uberspot.a2048_20.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 25, name: 'Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', package_name: 'Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', alias: 'Example', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5ad0bae975a3c_Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', entities_id: 0, dl_filename: 'Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 27, name: 'org.flyve.inventory.agent_37960.apk', package_name: 'org.flyve.inventory.agent_37960.apk', alias: 'InventoryAgent', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5ad0fc863aef2_org.flyve.inventory.agent_37960.apk', entities_id: 0, dl_filename: 'org.flyve.inventory.agent_37960.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 29, name: 'duckduckgo_1.apk', package_name: 'duckduckgo_1.apk', alias: 'DuckDuckGo ', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5ad0fcc8c8cd0_duckduckgo_1.apk', entities_id: 0, dl_filename: 'duckduckgo_1.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 33, name: 'mercado libre', package_name: 'mercado libre', alias: 'ML movil', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5af4b18987e3e_5af4b180948435.32479504mercadolibre-8-12-3.apk', entities_id: 0, dl_filename: '5af4b180948435.32479504mercadolibre-8-12-3.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }],
    }).as('polices4')

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmTask/?criteria[0][link]=and&criteria[0][field]=9&criteria[0][searchtype]=equals&criteria[0][value]=PluginFlyvemdmAgent&criteria[1][link]=and&criteria[1][field]=10&criteria[1][searchtype]=equals&criteria[1][value]=221&uid_cols=true&range=0-0&`,
      response: [{
        id: 3, name: 'org.fdroid.fdroid', package_name: 'org.fdroid.fdroid', alias: 'F-Droid', version: 0.97, version_code: 97050, icon: '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', filename: 'flyvemdm/package//var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var', entities_id: 0, dl_filename: '5a17683b0e006_5a17683632c270.98348587FDroid.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 6, name: 'com.uberspot.a2048', package_name: 'com.uberspot.a2048', alias: 2048, version: 2, version_code: 20, icon: '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', filename: 'flyvemdm/package//var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var/www/public/glpi/files/var', entities_id: 0, dl_filename: '5a172764898a95.5484936756fa7aa5ed741_com.uberspot.a2048_20.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 25, name: 'Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', package_name: 'Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', alias: 'Example', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5ad0bae975a3c_Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', entities_id: 0, dl_filename: 'Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 27, name: 'org.flyve.inventory.agent_37960.apk', package_name: 'org.flyve.inventory.agent_37960.apk', alias: 'InventoryAgent', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5ad0fc863aef2_org.flyve.inventory.agent_37960.apk', entities_id: 0, dl_filename: 'org.flyve.inventory.agent_37960.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 29, name: 'duckduckgo_1.apk', package_name: 'duckduckgo_1.apk', alias: 'DuckDuckGo ', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5ad0fcc8c8cd0_duckduckgo_1.apk', entities_id: 0, dl_filename: 'duckduckgo_1.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 33, name: 'mercado libre', package_name: 'mercado libre', alias: 'ML movil', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5af4b18987e3e_5af4b180948435.32479504mercadolibre-8-12-3.apk', entities_id: 0, dl_filename: '5af4b180948435.32479504mercadolibre-8-12-3.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }],
    }).as('polices5')

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmPolicyCategory/?uid_cols=true&range=0-0&`,
      response: {
        totalcount: 13, count: 1, sort: 1, order: 'ASC', data: [{ 'PluginFlyvemdmPolicyCategory.completename': 'Configuration' }], 'content-range': '0-0/13',
      },
    }).as('polices6')

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmPolicyCategory/?uid_cols=true&forcedisplay[0]=1&forcedisplay[1]=2&range=0-13&`,
      response: {
        totalcount: 13, count: 13, sort: 1, order: 'ASC', data: [{ 'PluginFlyvemdmPolicyCategory.completename': 'Configuration', 'PluginFlyvemdmPolicyCategory.id': 12 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Configuration > User interface', 'PluginFlyvemdmPolicyCategory.id': 13 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Deployment', 'PluginFlyvemdmPolicyCategory.id': 6 }, { 'PluginFlyvemdmPolicyCategory.completename': 'MDM', 'PluginFlyvemdmPolicyCategory.id': 9 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Mobile Device Management', 'PluginFlyvemdmPolicyCategory.id': 11 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Security', 'PluginFlyvemdmPolicyCategory.id': 1 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication', 'PluginFlyvemdmPolicyCategory.id': 2 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Security > Authentication > Password', 'PluginFlyvemdmPolicyCategory.id': 3 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Security > Encryption', 'PluginFlyvemdmPolicyCategory.id': 4 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Security > Peripherals', 'PluginFlyvemdmPolicyCategory.id': 5 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Security > Phone', 'PluginFlyvemdmPolicyCategory.id': 8 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Security > USB', 'PluginFlyvemdmPolicyCategory.id': 7 }, { 'PluginFlyvemdmPolicyCategory.completename': 'Security > User interface', 'PluginFlyvemdmPolicyCategory.id': 10 }], 'content-range': '0-12/13',
      },
    }).as('polices7')

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmFile/?range=0-0&`,
      response: {
        totalcount: 4, count: 1, sort: 1, order: 'ASC', data: [{ 1: 'decoded.jpeg', 4: null }], 'content-range': '0-0/4',
      },
    }).as('polices8')

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/search/PluginFlyvemdmPackage/?range=0-0&`,
      response: {
        totalcount: 4, count: 1, sort: 1, order: 'ASC', data: [{ 1: 'decoded.jpeg', 4: null }], 'content-range': '0-0/4',
      },
    }).as('polices9')

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/PluginFlyvemdmFile/?range=0-4&`,
      response: [{
        id: 43, name: 'logo2.png', source: '0/5abd12701feb2_logo2.png', entities_id: 0, version: 1, comment: null, links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 48, name: 'logo-plugin.png', source: '0/5acb72372edb7_logo-plugin.png', entities_id: 0, version: 1, comment: null, links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 78, name: 'decoded.jpeg', source: '0/5b11be1376218_decoded.jpeg', entities_id: 0, version: 1, comment: null, links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 79, name: 'IMG.jpg', source: '0/5b11be206c719_IMG_20180330_110129.jpg', entities_id: 0, version: 1, comment: null, links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }],
    }).as('polices10')

    cy.route({
      method: 'GET',
      delay: 200,
      url: `${window.appConfig.glpiApiLink}/PluginFlyvemdmPackage/?range=0-4&`,
      response: [{
        id: 25, name: 'Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', package_name: 'Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', alias: 'Example', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5ad0bae975a3c_Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', entities_id: 0, dl_filename: 'Flashlight 100Kb No Ads_v1_apkpure.com (1).apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 27, name: 'org.flyve.inventory.agent_37960.apk', package_name: 'org.flyve.inventory.agent_37960.apk', alias: 'InventoryAgent', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5ad0fc863aef2_org.flyve.inventory.agent_37960.apk', entities_id: 0, dl_filename: 'org.flyve.inventory.agent_37960.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 29, name: 'duckduckgo_1.apk', package_name: 'duckduckgo_1.apk', alias: 'DuckDuckGo ', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5ad0fcc8c8cd0_duckduckgo_1.apk', entities_id: 0, dl_filename: 'duckduckgo_1.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }, {
        id: 33, name: 'mercado libre', package_name: 'mercado libre', alias: 'ML movil', version: '', version_code: '', icon: '', filename: 'flyvemdm/package/0/5af4b18987e3e_5af4b180948435.32479504mercadolibre-8-12-3.apk', entities_id: 0, dl_filename: '5af4b180948435.32479504mercadolibre-8-12-3.apk', plugin_orion_tasks_id: 0, parse_status: 'parsed', links: [{ rel: 'Entity', href: 'https://dev.flyve.org/glpi/apirest.php/Entity/0' }],
      }],
    }).as('polices11')

    cy.route({
      method: 'GET',
      url: `${window.appConfig.glpiApiLink}/Computer/916/PluginFlyvemdmGeolocation`,
      response: [{
        id: 63, computers_id: 916, latitude: 37.421998333333, longitude: -122.084, date: '2018-05-10 16:37:26', links: [{ rel: 'Computer', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916' }],
      }, {
        id: 64, computers_id: 916, latitude: 37.421998333333, longitude: -122.084, date: '2018-05-10 16:45:45', links: [{ rel: 'Computer', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916' }],
      }, {
        id: 65, computers_id: 916, latitude: 37.421998333333, longitude: -122.084, date: '2018-05-21 22:05:19', links: [{ rel: 'Computer', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916' }],
      }, {
        id: 66, computers_id: 916, latitude: 65.966696666667, longitude: -18.5333, date: '2018-05-24 14:51:30', links: [{ rel: 'Computer', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916' }],
      }, {
        id: 67, computers_id: 916, latitude: 65.966696666667, longitude: -18.5333, date: '2018-05-24 14:51:30', links: [{ rel: 'Computer', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916' }],
      }, {
        id: 68, computers_id: 916, latitude: 65.966696666667, longitude: -18.5333, date: '2018-05-24 14:51:30', links: [{ rel: 'Computer', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916' }],
      }, {
        id: 69, computers_id: 916, latitude: 65.966696666667, longitude: -18.5333, date: '2018-05-24 14:51:30', links: [{ rel: 'Computer', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916' }],
      }, {
        id: 70, computers_id: 916, latitude: 65.966696666667, longitude: -18.5333, date: '2018-05-24 14:51:44', links: [{ rel: 'Computer', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916' }],
      }, {
        id: 71, computers_id: 916, latitude: 10.244191666667, longitude: -67.606611666667, date: '2018-05-24 14:53:00', links: [{ rel: 'Computer', href: 'https://dev.flyve.org/glpi/apirest.php/Computer/916' }],
      }],
    }).as('geolocation')

    localStorage.setItem('sessionToken', 'token1234')
    localStorage.setItem('showNotifications', 'true')
    localStorage.setItem('notificationType', 'Toast')

    localStorage.setItem('currentUser',
      JSON.stringify({
        id: 123,
        name: 'exampleName',
        email: 'example@teclib.com',
        picture: null,
      }))

    localStorage.setItem('display',
      JSON.stringify({
        applicationsUploaded: false,
        devicesByOperatingSystemVersion: false,
        devicesByUsers: false,
        devicesCurrentlyManaged: false,
        filesUploaded: false,
        fleetsCurrentlyManaged: false,
        invitationsSent: false,
        numberUsers: false,
        animations: false,
        pendingInvitations: false,
      }))
  })

  it('should navigate in users without problemss', () => {
    cy.visit('/app/devices')
    cy.contains('No selection')
    cy.get('#element__11')
    cy.get('main').screenshot('devices_noSelection', { capture: 'viewport' })
    cy.get('.win-itemscontainer').click('top')
    cy.get('.content-info > :nth-child(1)')
    cy.get('.header-block').click('topRight')
    cy.get('main').screenshot('devices_main', { capture: 'viewport' })
    cy.get('.win-pivot-headers > :nth-child(2)').click()
    cy.get('.system-report > :nth-child(2)')
    cy.get('.header-block').click('topRight')
    cy.get('main').screenshot('devices_systemReport', { capture: 'viewport' })
    cy.get('.win-pivot-headers > :nth-child(3)').click()
    cy.get('.header-block').click('topRight')
    cy.get('main').screenshot('devices_systemReport', { capture: 'viewport' })
    cy.get('.win-pivot-headers > :nth-child(4)').click()
    cy.wait(['@polices1', '@polices2', '@polices3', '@polices4', '@polices5', '@polices6', '@polices7', '@polices8', '@polices9', '@polices10', '@polices11'])
    cy.get('main').screenshot('devices_polices', { capture: 'viewport' })
    cy.get('.win-pivot-headers > :nth-child(5)').click()
    cy.wait('@geolocation')
    cy.wait(1000)
    cy.get('main').screenshot('devices_geolocation', { capture: 'viewport' })
    cy.get('.win-pivot-headers > :nth-child(6)').click()
    cy.get('main').screenshot('devices_dangerZone', { capture: 'viewport' })
    cy.get(':nth-child(1) > .list-element__controller > .btn').click()
    cy.get('main').screenshot('devices_dangerZone_wipe', { capture: 'viewport' })
    cy.get('.win-contentdialog-visible > .win-contentdialog-dialog > .win-contentdialog-commands > .win-contentdialog-secondarycommand').click()
    cy.get(':nth-child(2) > .list-element__controller > .btn').click()
    cy.get('main').screenshot('devices_dangerZone_unenroll', { capture: 'viewport' })
    cy.get('.win-contentdialog-visible > .win-contentdialog-dialog > .win-contentdialog-commands > .win-contentdialog-secondarycommand').click()
    cy.get(':nth-child(3) > .list-element__controller > .btn').click()
    cy.get('main').screenshot('devices_dangerZone_delete', { capture: 'viewport' })
  })
})
