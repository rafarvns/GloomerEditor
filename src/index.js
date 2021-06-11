var express = require('express');
var bodyParser = require('body-parser')
var connect = require('connect');
var serveStatic = require('serve-static');
var fs = require('fs')
var toJSON = require('plain-text-data-to-json')
var { format, parse } = require('lua-json')
var replace = require('replace-in-file');

var app = express();

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/path', function (req, res) {
    try {
        const path = fs.readFileSync('./path.ini', 'utf8');
        const pathObj = toJSON(path, { comment: [';', '['], delimiter: '=' });
        res.send({
            message: '😁 The data from path.ini file has been getted.',
            data: pathObj,
            status: 200,
            error: 'none'
        });
    } catch (error) {
        res.send({
            message: `😖 ERROR: Can't get the data from path.ini file.`,
            status: 500,
            error
        });
    }
});

app.post('/path', function (req, res) {

    try {
        const path = fs.readFileSync('./path.ini', 'utf8');
        const pathObj = toJSON(path, { comment: [';', '['], delimiter: '=' });
        const options = {
            files: "path.ini",
            from: [
                "cluster_path = " + pathObj.cluster_path,
                "forest_path = " + pathObj.forest_path,
                "cave_path = " + pathObj.cave_path,
                "cluster_token_path = " + pathObj.cluster_token_path,
            ],
            to: [
                "cluster_path = " + req.body.cluster_path,
                "forest_path = " + req.body.forest_path,
                "cave_path = " + req.body.cave_path,
                "cluster_token_path = " + req.body.cluster_token_path,
            ]
        };

        const pathFile = replace.sync(options);
        if (pathFile[0].hasChanged) {
            res.send({
                message: '😁 The changes on path.ini file has been saved.',
                status: 200,
                error: 'none'
            });
        } else {
            res.send({
                message: `😀 Haven't changes to save on path.ini file.`,
                status: 200,
                error: 'none'
            });
        }

    } catch (error) {
        console.log(error)
        res.send({
            message: `😖 ERROR: Can't save the changes on path.ini file.`,
            status: 500,
            error
        });
    }
});

app.get('/cluster', function (req, res) {
    try {
        const path = fs.readFileSync('./path.ini', 'utf8');
        const pathObj = toJSON(path, { comment: [';', '['], delimiter: '=' });

        const cluster = fs.readFileSync(`${pathObj.cluster_path}`, 'utf8');
        const clusterObj = toJSON(cluster, { comment: [';', '['], delimiter: '=' });
        res.send({
            message: '😁 The data from cluster.ini file has been getted.',
            data: clusterObj,
            status: 200,
            error: 'none'
        });
    } catch (error) {
        res.send({
            message: `😖 ERROR: Can't get the data from cluster.ini file.`,
            status: 500,
            error
        });
    }
});

app.post('/cluster', function (req, res) {

    try {
        const path = fs.readFileSync('./path.ini', 'utf8');
        const pathObj = toJSON(path, { comment: [';', '['], delimiter: '=' });

        const cluster = fs.readFileSync(`${pathObj.cluster_path}`, 'utf8');
        const clusterObj = toJSON(cluster, { comment: [';', '['], delimiter: '=' });
        const options = {
            files: "../DSTClusterConfig/cluster.ini",
            from: [
                "autosaver_enabled = " + clusterObj.autosaver_enabled,
                "bind_ip = " + clusterObj.bind_ip,
                "cluster_intention = " + clusterObj.cluster_intention,
                "cluster_name = " + clusterObj.cluster_name,
                "cluster_description = " + clusterObj.cluster_description,
                "cluster_password = " + clusterObj.cluster_password,
                "connection_timeout = " + clusterObj.connection_timeout,
                "console_enabled = " + clusterObj.console_enabled,
                "cluster_key = " + clusterObj.cluster_key,
                "enable_vote_kick = " + clusterObj.enable_vote_kick,
                "game_mode = " + clusterObj.game_mode,
                "max_players = " + clusterObj.max_players,
                "max_snapshots = " + clusterObj.max_snapshots,
                "master_ip = " + clusterObj.master_ip,
                "pvp = " + clusterObj.pvp,
                "pause_when_empty = " + clusterObj.pause_when_empty,
                "shard_enabled = " + clusterObj.shard_enabled,
                "tick_rate = " + clusterObj.tick_rate,
                "vote_enabled = " + clusterObj.vote_enabled
            ],
            to: [
                "autosaver_enabled = " + req.body.autosaver_enabled,
                "bind_ip = " + req.body.bind_ip,
                "cluster_intention = " + req.body.cluster_intention,
                "cluster_name = " + req.body.cluster_name,
                "cluster_description = " + req.body.cluster_description,
                "cluster_password = " + req.body.cluster_password,
                "connection_timeout = " + req.body.connection_timeout,
                "console_enabled = " + req.body.console_enabled,
                "cluster_key = " + req.body.cluster_key,
                "enable_vote_kick = " + req.body.enable_vote_kick,
                "game_mode = " + req.body.game_mode,
                "max_players = " + req.body.max_players,
                "max_snapshots = " + req.body.max_snapshots,
                "master_ip = " + req.body.master_ip,
                "pvp = " + req.body.pvp,
                "pause_when_empty = " + req.body.pause_when_empty,
                "shard_enabled = " + req.body.shard_enabled,
                "tick_rate = " + req.body.tick_rate,
                "vote_enabled = " + req.body.vote_enabled
            ]
        };

        const clusterFile = replace.sync(options);
        if (clusterFile[0].hasChanged) {
            res.send({
                message: '😁 The changes on cluster.ini file has been saved.',
                status: 200,
                error: 'none'
            });
        } else {
            res.send({
                message: `😀 Haven't changes to save on cluster.ini file.`,
                status: 200,
                error: 'none'
            });
        }

    } catch (error) {
        console.log(error)
        res.send({
            message: `😖 ERROR: Can't save the changes on cluster.ini file.`,
            status: 500,
            error
        });
    }
});

app.get('/forest', function (req, res) {
    try {
        const path = fs.readFileSync('./path.ini', 'utf8');
        const pathObj = toJSON(path, { comment: [';', '['], delimiter: '=' });

        const world = fs.readFileSync(`${pathObj.forest_path}`, 'utf8');
        const worldObj = parse(world);
        res.send({
            message: '😁 The data from Master/leveldataoverride.lua file has been getted.',
            data: worldObj,
            status: 200,
            error: 'none'
        });
    } catch (error) {
        res.send({
            message: `😖 ERROR: Can't get the data from Master/leveldataoverride.lua file.`,
            status: 500,
            error
        });
    }
});

app.post('/forest', function (req, res) {
    try {
        const path = fs.readFileSync('./path.ini', 'utf8');
        const pathObj = toJSON(path, { comment: [';', '['], delimiter: '=' });

        const forestLua = format(req.body);
        const fsRes = fs.writeFileSync(`${pathObj.forest_path}`, forestLua);

        res.send({
            message: '😁 The changes on Master/leveldataoverride.lua file has been saved.',
            status: 200,
            error: 'none',
            fsRes
        });

    } catch (error) {
        console.log(error)
        res.send({
            message: `😖 ERROR: Can't save the changes on Master/leveldataoverride.lua file.`,
            status: 500,
            error
        });
    }
});

app.listen(3000, function () {
    console.log('Api listening on port 3000!');
});

connect()
    .use(serveStatic('src'))
    .listen(8080, () => {
        console.log('App running on port 8080!');
    });




