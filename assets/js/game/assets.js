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
                }
            },
            geometries: {
                battleship: {
                    url: 'assets/models/battleship.json'
                },
                logo: {
                    url: 'assets/models/logo.json'
                }
            },
            audio: {
                ocean: {
                    url: 'assets/audio/bgm/ocean.mp3'
                }
            }
        },
        textures: { },
        geometries: { },
        audio: { }
    };
});