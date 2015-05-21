define(['Stats', 'container'], function(Stats, container) {
    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.left = '0px';

    document.body.appendChild(stats.domElement);

    return stats;
});