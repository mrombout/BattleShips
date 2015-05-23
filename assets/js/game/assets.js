define(['three'], function(THREE) {
    return {
        config: {
            textures: {
                water_normal: {
                    url: 'assets/texture/waternormals3.jpg',
                    anisotropy: 16,
                    wrapS: THREE.RepeatWrapping,
                    wrapT: THREE.RepeatWrapping
                },
                battleship_diffuse: {
                    url: 'assets/texture/battleship.png',
                    anisotropy: 16
                },
                battleship_bump: {
                    url: 'assets/texture/battleship_b.png',
                    anisotropy: 16
                },
                battleship_normal: {
                    url: 'assets/texture/battleship_n.png',
                    anisotropy: 16
                },
                battleship_specular: {
                    url: 'assets/texture/battleship_s.png',
                    anisotropy: 16
                },
                logo_diffuse: {
                    url: 'assets/texture/logo.png',
                    anisotropy: 16
                },
                logo_bump: {
                    url: 'assets/texture/logo_b.png',
                    anisotropy: 16
                },
                logo_normal: {
                    url: 'assets/texture/logo_n.png',
                    anisotropy: 16
                },
                logo_specular: {
                    url: 'assets/texture/logo_s.png',
                    anisotropy: 16
                },
                skydome_diffuse: {
                    url: 'assets/texture/skydome.jpg'
                }
            },
            geometries: {
                battleship: {
                    url: 'assets/models/battleship.json'
                },
                logo: {
                    url: 'assets/models/logo.json'
                },
                destroyer: {
                    url: 'assets/models/destroyer.json'
                },
                patrol_boat: {
                    url: 'assets/models/patrol.json'
                },
                submarine: {
                    url: 'assets/models/submarine.json'
                },
                battleship_dummy: {
                    url: 'assets/models/battleship_dummy.json'
                },
                aircraft_carrier: {
                    url: 'assets/models/aircraft_carrier.json'
                }
            },
            audio: {
                ocean: {
                    url: 'assets/audio/bgm/ocean.wav'
                },
                intro: {
                    url: 'assets/audio/bgm/ghost_division.wav'
                }
            }
        },
        textures: { },
        geometries: { },
        audio: { },
        materials: { }
    };
});