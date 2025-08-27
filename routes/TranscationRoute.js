const express = require("express")
const { addTransaction, getTransactionById, deleteTransaction, getTransactionSummary } = require("../controllers/TranscationController.js")

const transcationRoute = express.Router()

transcationRoute.post("/",addTransaction)
transcationRoute.get("/:userId",getTransactionById)
transcationRoute.delete("/:id",deleteTransaction)
transcationRoute.get("/summary/:userId",getTransactionSummary)

module.exports = transcationRoute