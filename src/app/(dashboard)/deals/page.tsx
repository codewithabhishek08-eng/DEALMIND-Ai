"use client";

import { useEffect, useState, useMemo } from "react";
import { getDeals, createDeal } from "@/lib/api";
import { Deal } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { 
  ArrowUpDown, MoreHorizontal, Search, Download, Upload, 
  Plus, ChevronLeft, ChevronRight, CheckCircle2, FileUp, Filter
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

// --- Deal Schema ---
const dealSchema = z.object({
  dealName: z.string().min(1, "Deal name is required"),
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  owner: z.string().min(1, "Owner is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  stage: z.enum(["Discovery", "Demo", "Negotiation", "Closed Won", "Closed Lost"]),
  probability: z.number().min(0).max(100),
  priority: z.enum(["High", "Medium", "Low"]),
  riskLevel: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["Active", "Paused", "Blocked"]),
  closeDate: z.string().min(1, "Close date is required"),
});
type DealFormValues = z.infer<typeof dealSchema>;

export default function DealsPage() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [ownerFilter, setOwnerFilter] = useState("All");
  
  // Table State
  const [sortField, setSortField] = useState<keyof Deal>("closeDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  // Modals
  const [newDealOpen, setNewDealOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importStep, setImportStep] = useState<"upload" | "preview" | "done">("upload");

  const fetchDeals = async () => {
    setIsLoading(true);
    const data = await getDeals();
    setDeals(data);
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDeals();
  }, []);

  // --- Filtering & Sorting ---
  const handleSort = (field: keyof Deal) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedDeals = useMemo(() => {
    let result = deals;

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(d => 
        d.companyName.toLowerCase().includes(s) || 
        d.dealName.toLowerCase().includes(s) ||
        d.contactName.toLowerCase().includes(s)
      );
    }
    if (statusFilter !== "All") result = result.filter(d => d.status === statusFilter);
    if (priorityFilter !== "All") result = result.filter(d => d.priority === priorityFilter);
    if (ownerFilter !== "All") result = result.filter(d => d.owner === ownerFilter);

    result = [...result].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [deals, search, sortField, sortDirection, statusFilter, priorityFilter, ownerFilter]);

  const totalPages = Math.ceil(filteredAndSortedDeals.length / itemsPerPage);
  const paginatedDeals = filteredAndSortedDeals.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const uniqueOwners = Array.from(new Set(deals.map(d => d.owner)));

  // --- New Deal Form ---
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      dealName: "", companyName: "", contactName: "", owner: "Current User",
      amount: 0, stage: "Discovery", probability: 50, priority: "Medium",
      riskLevel: "Low", status: "Active", closeDate: new Date().toISOString().split('T')[0]
    }
  });

  const onSubmitDeal = async (data: DealFormValues) => {
    await createDeal({
      ...data,
      closeDate: new Date(data.closeDate).toISOString(),
      nextStep: "Initial discussion",
      sentimentScore: 50
    });
    reset();
    setNewDealOpen(false);
    fetchDeals();
  };

  // --- Export Action ---
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Deal Name,Company,Contact,Owner,Amount,Stage\n" 
      + deals.map(e => `${e.dealName},${e.companyName},${e.contactName},${e.owner},${e.amount},${e.stage}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pipeline_export.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const getPriorityBadgeVariant = (priority: string) => priority === "High" ? "destructive" : priority === "Medium" ? "secondary" : "outline";
  const getRiskBadgeVariant = (risk: string) => risk === "High" ? "destructive" : risk === "Medium" ? "secondary" : "default";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pipeline Deals</h1>
        <div className="flex flex-wrap items-center gap-2">
          
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>

          {/* Import CSV Modal */}
          <Dialog open={importOpen} onOpenChange={(open) => { setImportOpen(open); if(!open) setImportStep("upload"); }}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" /> Import CSV
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Import Deals</DialogTitle>
                <DialogDescription>Upload a CSV file to bulk import deals into your pipeline.</DialogDescription>
              </DialogHeader>
              
              {importStep === "upload" && (
                <div className="border-2 border-dashed rounded-lg p-12 mt-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50"
                     onClick={() => setImportStep("preview")}>
                  <FileUp className="w-10 h-10 text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg">Click to browse or drag file here</h3>
                  <p className="text-sm text-muted-foreground mt-1">.csv, .xlsx up to 10MB</p>
                </div>
              )}

              {importStep === "preview" && (
                <div className="space-y-4 pt-4">
                  <div className="bg-muted rounded-md p-3 text-sm">
                    <p className="font-medium flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4 text-success" /> 3 Deals parsed successfully</p>
                    <ul className="text-muted-foreground list-disc list-inside space-y-1 ml-1">
                      <li>Wayne Ent Q4 Upsell ($200k)</li>
                      <li>Daily Planet Renewal ($50k)</li>
                      <li>LexCorp Implementation ($1.2M)</li>
                    </ul>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setImportStep("upload")}>Cancel</Button>
                    <Button onClick={() => setImportStep("done")}>Confirm Import</Button>
                  </div>
                </div>
              )}

              {importStep === "done" && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-12 h-12 text-success mb-4" />
                  <h3 className="text-xl font-semibold">Import Complete!</h3>
                  <p className="text-muted-foreground mt-2">3 deals have been successfully added to your pipeline.</p>
                  <Button className="mt-6" onClick={() => setImportOpen(false)}>Close</Button>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* New Deal Modal */}
          <Dialog open={newDealOpen} onOpenChange={setNewDealOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> New Deal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Deal</DialogTitle>
                <DialogDescription>Add a new deal opportunity to the pipeline.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmitDeal)} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deal Name</label>
                  <Input {...register("dealName")} placeholder="e.g. Acme Q3 Expansion" />
                  {errors.dealName && <p className="text-xs text-destructive">{errors.dealName.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input {...register("companyName")} placeholder="Acme Corp" />
                    {errors.companyName && <p className="text-xs text-destructive">{errors.companyName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Name</label>
                    <Input {...register("contactName")} placeholder="Jane Doe" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount ($)</label>
                    <Input type="number" {...register("amount")} placeholder="50000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expected Close</label>
                    <Input type="date" {...register("closeDate")} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Stage</label>
                    <select {...register("stage")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="Discovery">Discovery</option>
                      <option value="Demo">Demo</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Closed Won">Closed Won</option>
                      <option value="Closed Lost">Closed Lost</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select {...register("status")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="Active">Active</option>
                      <option value="Paused">Paused</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <select {...register("priority")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-4 gap-2">
                  <Button type="button" variant="outline" onClick={() => setNewDealOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Create Deal"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card p-2 rounded-md border">
        <div className="flex items-center relative flex-1 min-w-[250px]">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
          <Input 
            placeholder="Search deal, company, or contact..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 border-none bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="h-6 w-px bg-border hidden sm:block" />
        
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground ml-2 hidden sm:block" />
          <select 
            value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="h-9 rounded-md border-0 bg-transparent text-sm focus:ring-0 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Blocked">Blocked</option>
          </select>
          <select 
            value={priorityFilter} onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}
            className="h-9 rounded-md border-0 bg-transparent text-sm focus:ring-0 cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select 
            value={ownerFilter} onChange={(e) => { setOwnerFilter(e.target.value); setPage(1); }}
            className="h-9 rounded-md border-0 bg-transparent text-sm focus:ring-0 cursor-pointer"
          >
            <option value="All">All Owners</option>
            {uniqueOwners.map(owner => <option key={owner} value={owner}>{owner}</option>)}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-md border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("dealName")} className="hover:bg-transparent px-0 font-semibold">
                    Deal Name <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("amount")} className="hover:bg-transparent px-0 font-semibold">
                    Revenue <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status / Risk</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">Loading deals...</TableCell>
                </TableRow>
              ) : paginatedDeals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">No deals found matching filters.</TableCell>
                </TableRow>
              ) : (
                paginatedDeals.map((deal) => (
                  <TableRow 
                    key={deal.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/deals/${deal.id}`)}
                  >
                    <TableCell className="font-medium whitespace-nowrap">
                      {deal.dealName}
                      <div className="text-xs text-muted-foreground font-normal">Next: {deal.nextMeeting || 'None'}</div>
                    </TableCell>
                    <TableCell>
                      <div>{deal.companyName}</div>
                      <div className="text-xs text-muted-foreground">{deal.contactName}</div>
                    </TableCell>
                    <TableCell>{deal.owner}</TableCell>
                    <TableCell>{deal.stage}</TableCell>
                    <TableCell>${deal.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-secondary h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: `${deal.probability}%` }} />
                        </div>
                        <span className="text-xs">{deal.probability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityBadgeVariant(deal.priority)} className="text-[10px]">
                        {deal.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 items-start">
                        <Badge variant="outline" className="text-[10px]">{deal.status}</Badge>
                        <Badge variant={getRiskBadgeVariant(deal.riskLevel)} className="text-[10px]">{deal.riskLevel} Risk</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => router.push(`/deals/${deal.id}`)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">Delete Deal</DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <div className="text-sm text-muted-foreground">Page {page} of {totalPages}</div>
          <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
