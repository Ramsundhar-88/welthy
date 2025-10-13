"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash,
  X,
} from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categoryColors } from "@/data/categories"
import { Input } from "@/components/ui/input"
import useFetch from "@/hooks/use-fetch"
import { bulkDeleteTranscations } from "@/actions/account"
import { BarLoader } from "react-spinners"

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
}

const TranscationTable = ({ transactions }) => {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState([])
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  })


  const [searchTerm,setSearchTerm] = useState("")
  const [typeFilter,setTypeFilter] = useState("")
  const [recurringFilter,setRecurringFilter]=useState("")
  const{
    loading:deleteLoading,
    fn:deletefn,
    data:deleted} =useFetch(bulkDeleteTranscations)





  const filteredSortedTransactions = useMemo(()=>{
    let result = [...transactions]

    if(searchTerm){
      const searchLower = searchTerm.toLowerCase()
      result = result.filter((transaction)=> transaction.description?.toLowerCase().includes(searchLower))
    }

if (recurringFilter) {
  result = result.filter((transaction) => {
    if (recurringFilter === "recurring") return transaction.isRecurring === true
    if (recurringFilter === "onetime") return transaction.isRecurring === false
    return true
  })
}


    if(typeFilter){
      result = result.filter((transaction)=> transaction.type === typeFilter)
    }

    result.sort((a,b)=>{
      let comparison =0

      switch(sortConfig.field){
        case "date":
          comparison=new Date(a.date) - new Date(b.date)
          break
          
          case "amount":
            comparison=a.amount - b.amount
            break
            
            case "category":
              comparison=a.category - b.category
              break

        default:
          comparison=0
      }

      return sortConfig.direction ==="asc" ? comparison: -comparison

    })


    return result

  },[transactions,searchTerm,typeFilter,recurringFilter,sortConfig])

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === filteredSortedTransactions.length
        ? []
        : filteredSortedTransactions.map((t) => t.id)
    )
  }

  const handleBulkDelete = async()=>{
    if(!window.confirm(
      `Are you sure you want to delete ${selectedIds.length} transcations`
    )){
      return 
    }
    await deletefn(selectedIds)
  }


useEffect(() => {
  if (deleted && !deleteLoading) {
    toast.success("Transactions deleted successfully")
    setSelectedIds([])

   
    router.refresh()  


  }
}, [deleted, deleteLoading])


  const handleClearFilters =()=>{
    setRecurringFilter("")
    setSearchTerm("")
    setTypeFilter("")
    setSelectedIds([])
  }

  return (
   <div className="space-y-4">
  {deleteLoading && (
    <BarLoader className="mt-4" width="100%" color="#9333ea" />
  )}

  {/* Filters */}
  <div className="flex flex-col gap-3">
    {/* Search bar - full width on mobile */}
    <div className="relative w-full">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-8"
        placeholder="Search Transaction"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Filter buttons row */}
    <div className="flex flex-wrap gap-2">
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="INCOME">Income</SelectItem>
          <SelectItem value="EXPENSE">Expense</SelectItem>
        </SelectContent>
      </Select>

      <Select value={recurringFilter} onValueChange={setRecurringFilter}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Transaction" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="onetime">One-Time</SelectItem>
          <SelectItem value="recurring">Recurring</SelectItem>
        </SelectContent>
      </Select>

      {(searchTerm || typeFilter || recurringFilter) && (
        <Button
          variant="outline"
          size="icon"
          onClick={handleClearFilters}
          title="Clear Filters"
          className="shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>

    {/* Bulk delete button - full width on mobile */}
    {selectedIds.length > 0 && (
      <Button
        variant="destructive"
        size="sm"
        onClick={handleBulkDelete}
        className="w-full sm:w-auto"
      >
        <Trash className="h-4 w-4 mr-2" /> Delete Selected ({selectedIds.length})
      </Button>
    )}
  </div>

  {/* Desktop Table View - hidden on mobile */}
  <div className="hidden md:block overflow-x-auto rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox
              onCheckedChange={handleSelectAll}
              checked={
                selectedIds.length === filteredSortedTransactions.length &&
                filteredSortedTransactions.length > 0
              }
            />
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
            <div className="flex items-center">
              Date {sortConfig.field === "date" && (sortConfig.direction === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("description")}>
            <div className="flex items-center">
              Description {sortConfig.field === "description" && (sortConfig.direction === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
            <div className="flex items-center">
              Category {sortConfig.field === "category" && (sortConfig.direction === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
            <div className="flex items-center">
              Amount {sortConfig.field === "amount" && (sortConfig.direction === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
            </div>
          </TableHead>
          <TableHead>Recurring</TableHead>
          <TableHead className="w-[70px]">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredSortedTransactions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
              No Transaction Found
            </TableCell>
          </TableRow>
        ) : (
          filteredSortedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Checkbox
                  onCheckedChange={() => handleSelect(transaction.id)}
                  checked={selectedIds.includes(transaction.id)}
                />
              </TableCell>

              <TableCell className="whitespace-nowrap">{format(new Date(transaction.date), "PP")}</TableCell>

              <TableCell className="max-w-[200px] truncate">{transaction.description}</TableCell>

              <TableCell className="capitalize">
                <span
                  style={{ background: categoryColors[transaction.category] }}
                  className="rounded px-2 py-1 text-sm text-white inline-block"
                >
                  {transaction.category}
                </span>
              </TableCell>

              <TableCell
                className="font-medium whitespace-nowrap"
                style={{
                  color: transaction.type === "EXPENSE" ? "red" : "green",
                }}
              >
                {transaction.type === "EXPENSE" ? "-" : "+"}
                {transaction.amount.toFixed(2)}
              </TableCell>

              <TableCell>
                {transaction.isRecurring ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="secondary" className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200">
                          <RefreshCw className="h-3 w-3" />
                          {RECURRING_INTERVALS[transaction.recurringInterval]}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          <div className="font-medium">Next Date:</div>
                          <div>{format(new Date(transaction.nextRecurringDate), "PPP")}</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    One-time
                  </Badge>
                )}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/transaction/create?edit=${transaction.id}`)
                      }
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => deletefn([transaction.id])}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>

  {/* Mobile Card View - shown only on mobile */}
  <div className="md:hidden space-y-3">
    {filteredSortedTransactions.length === 0 ? (
      <div className="text-center text-muted-foreground py-8 border rounded-md">
        No Transaction Found
      </div>
    ) : (
      filteredSortedTransactions.map((transaction) => (
        <div key={transaction.id} className="border rounded-lg p-4 space-y-3 bg-card">
          {/* Header row with checkbox and actions */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                onCheckedChange={() => handleSelect(transaction.id)}
                checked={selectedIds.includes(transaction.id)}
              />
              <div>
                <p className="font-medium text-base">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(transaction.date), "PP")}
                </p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/transaction/create?edit=${transaction.id}`)
                  }
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => deletefn([transaction.id])}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Amount - prominent display */}
          <div className="flex items-center justify-between">
            <span
              style={{ background: categoryColors[transaction.category] }}
              className="rounded px-3 py-1 text-sm text-white capitalize"
            >
              {transaction.category}
            </span>
            
            <span
              className="text-xl font-bold"
              style={{
                color: transaction.type === "EXPENSE" ? "red" : "green",
              }}
            >
              {transaction.type === "EXPENSE" ? "-" : "+"}
              {transaction.amount.toFixed(2)}
            </span>
          </div>

          {/* Recurring badge */}
          <div>
            {transaction.isRecurring ? (
              <Badge variant="secondary" className="gap-1 bg-purple-100 text-purple-700">
                <RefreshCw className="h-3 w-3" />
                {RECURRING_INTERVALS[transaction.recurringInterval]}
                <span className="text-xs ml-1">
                  (Next: {format(new Date(transaction.nextRecurringDate), "MMM dd")})
                </span>
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                One-time
              </Badge>
            )}
          </div>
        </div>
      ))
    )}
  </div>
</div>
  )
}

export default TranscationTable
