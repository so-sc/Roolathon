"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { financialContract } from "@/lib/contract"
import jsPDF from "jspdf"
import { FormEvent, useState } from "react"

function ContractPage() {
  const [contractDetails, setContractDetails] = useState({
    receiverName: "",
    amount: "",
    companyName: "Finvest",
    date: `${new Date().getDate()} - ${
      new Date().getMonth() + 1
    } - ${new Date().getFullYear()}`,
  })

  function submitContract(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(contractDetails)
    const contract = document.getElementById("contract")?.innerText
    if (!contract) return
    const pdfDoc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    pdfDoc.setFontSize(12)
    pdfDoc.setFont("helvetica")

    const maxWidth = 180 // maximum width in mm
    const textLines = pdfDoc.splitTextToSize(contract, maxWidth)
    pdfDoc.text(textLines, 10, 10)
    pdfDoc.save("output.pdf")
  }

  return (
    <main className="lg:flex">
      <aside className="lg:w-1/2">
        <ScrollArea className="h-[80vh] p-8 overflow-auto bg-gray-100 rounded-md dark:bg-gray-800">
          <h1 className="text-2xl font-bold mb-4">
            FINANCIAL CONSULTING CONTRACT
          </h1>
          <p
            className="text-base text-gray-600 dark:text-gray-300 overflow-auto text-justify"
            id="contract"
          >
            {financialContract(
              contractDetails.receiverName,
              contractDetails.date,
              contractDetails.amount,
              contractDetails.companyName
            )}
          </p>
        </ScrollArea>
      </aside>
      <section className="lg:w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-6">Fill your Details</h2>
        <form className="space-y-6" onSubmit={submitContract}>
          <div className="space-y-2">
            <Label htmlFor="receiver-name">Receiver Name</Label>
            <Input
              id="receiver-name"
              placeholder="Enter receiver's name"
              defaultValue={contractDetails.receiverName}
              onChange={(e) => {
                setContractDetails({
                  ...contractDetails,
                  receiverName: e.target.value,
                })
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              value={contractDetails.companyName}
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              defaultValue={contractDetails.amount}
              onChange={(e) => {
                setContractDetails({
                  ...contractDetails,
                  amount: e.target.value,
                })
              }}
              placeholder="Amount"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              required
              type="text"
              value={contractDetails.date}
            />
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </section>
    </main>
  )
}

export default ContractPage
