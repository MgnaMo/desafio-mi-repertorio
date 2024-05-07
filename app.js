const express = require("express");
const path = require('path');
const { postSongs, getSongs, putSongs, deleteSongs } = require("./querys")

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post('/cancion', async (req, res) => {
    const { titulo, artista, tono } = req.body;
    try {
        await postSongs(titulo, artista, tono);
        res.send("Canción agregada correctamente");
    } catch (error) {
        console.error("Error al agregar canción: ", error);
        res.status(500).send("Error al agregar canción");
    }
});

app.get('/canciones', async (req, res) => {
    try {
        const canciones = await getSongs();
        res.json(canciones);
    } catch (error) {
        console.error("Error al obtener caciones: ", error);
        res.status(500).send("Error al obtener canciones");
    }
});

app.put('/cancion/:id', async (req, res) => {
    const { id } = req.params;
    const { artista, tono } = req.body;

    try {
        await putSongs(artista, tono, id);
        res.send("Canción actualizada correctamente");
    } catch (error) {
        console.error("Error al actualizar canción: ", error);
        res.status(500).send("Error al actualizar canción");
    }
});

app.delete("/cancion/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await deleteSongs(id);
        res.send("Canción eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar canción: ", error);
        res.status(500).send("Error al eliminar canción");
    }
});

app.listen(3000, () => {
    console.log("Servidor inicializado en el puerto 3000");
});