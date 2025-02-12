import express from 'express'
import { dbAll, dbGet, dbRun } from '../db/database.js'

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const rows = await dbAll("SELECT * FROM novenyek");
        res.status(200).json(rows)
    } catch (err) {
        console.log(`Error: ${err.message}`)
        res.status(500).json({message: err.message})
    }
})

router.post("/", async (req, res) => {
    const {nev, evelo, kategoria, ar} = req.body
    if(!nev && !evelo && !kategoria && !ar) {
        return res.status(400).json({message: "Missing data!"})
    }
    try {
        await dbRun('INSERT INTO novenyek (nev, evelo, kategoria, ar) VALUES (?, ?, ?, ?)', [nev, evelo, kategoria, ar]);

        res.status(201).json({ message: 'Created successfully!' })
    } catch {
        res.status(500).json({message: err.message})
    }
})

router.put('/:id', async (req, res) => {
    const { nev, evelo, kategoria, ar } = req.body
    if (!nev || !evelo || !kategoria || !ar) {
        return res.status(400).json({ message: 'Missing data!' })
    }
    try {
        const noveny = await dbGet('SELECT * FROM novenyek WHERE id = ?', [req.params.id])
        if (!noveny) {
            return res.status(404).json({ message: 'Car not found!' })
        }
        await dbRun('UPDATE novenyek SET nev = ?, evelo = ?, kategoria = ?, ar = ? WHERE id = ?', [nev, evelo, kategoria, ar, req.params.id]);

        res.status(200).json({ message: 'Update successful' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const noveny = await dbGet('SELECT * FROM novenyek WHERE id = ?', [req.params.id])
        if (!noveny) {
            return res.status(404).json({ message: 'Plant not found!' })
        }
        await dbRun('DELETE FROM novenyek WHERE id = ?', [req.params.id])
        res.status(200).json({ message: 'Delete successful!' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router