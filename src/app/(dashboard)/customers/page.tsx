"use client";

import { useEffect, useState } from "react";
import { getCustomers } from "@/lib/api";
import { Customer } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Search, Users, LayoutGrid, List, Plus, MoreHorizontal, Mail, Phone, 
  Building, Briefcase, DollarSign, Activity, FilePlus2, Calendar
} from "lucide-react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getCustomers();
      setCustomers(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  const getHealthColor = (score: number) => score >= 80 ? "text-success" : score >= 50 ? "text-accent" : "text-destructive";
  const getHealthBg = (score: number) => score >= 80 ? "bg-success" : score >= 50 ? "bg-accent" : "bg-destructive";

  if (isLoading) {
    return <div className="p-8 flex justify-center items-center h-full text-muted-foreground">Loading customers...</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" /> Customers
          </h1>
          <p className="text-muted-foreground mt-1">Manage your accounts and contacts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setView('grid')} className={view === 'grid' ? 'bg-muted' : ''}>
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setView('table')} className={view === 'table' ? 'bg-muted' : ''}>
            <List className="w-4 h-4" />
          </Button>
          <Button className="gap-2 ml-2">
            <Plus className="w-4 h-4" /> Add Customer
          </Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search customers by name or company..." 
          className="pl-9 bg-card"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCustomers.map(customer => (
            <Card key={customer.id} className="overflow-hidden hover:shadow-md transition-shadow group">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4 items-center">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{customer.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><Building className="w-3 h-3" /> {customer.company}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem><FilePlus2 className="w-4 h-4 mr-2"/> Create Deal</DropdownMenuItem>
                          <DropdownMenuItem><Calendar className="w-4 h-4 mr-2"/> Schedule Meeting</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mt-6">
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1"><Mail className="w-3 h-3"/> Email</p>
                      <p className="truncate font-medium">{customer.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1"><Phone className="w-3 h-3"/> Phone</p>
                      <p className="truncate font-medium">{customer.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1"><Briefcase className="w-3 h-3"/> Industry</p>
                      <Badge variant="secondary" className="font-normal">{customer.industry}</Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1"><DollarSign className="w-3 h-3"/> Revenue</p>
                      <p className="font-medium">{customer.revenue}</p>
                    </div>
                  </div>

                </div>
                
                <div className="bg-muted/30 p-4 border-t grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Open Deals</p>
                    <p className="font-bold">{customer.openDealsCount}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground mb-1 flex justify-between">
                      <span>Health Score</span>
                      <span className={`font-bold ${getHealthColor(customer.healthScore)}`}>{customer.healthScore}</span>
                    </p>
                    <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${getHealthBg(customer.healthScore)}`} style={{ width: `${customer.healthScore}%` }} />
                    </div>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 px-4 border-t flex items-start gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground line-clamp-1">{customer.recentActivity}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Industry / Revenue</TableHead>
                <TableHead>Deals</TableHead>
                <TableHead>Health</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.company}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{customer.email}</p>
                    <p className="text-xs text-muted-foreground">{customer.phone}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="mb-1 font-normal">{customer.industry}</Badge>
                    <p className="text-xs text-muted-foreground">{customer.revenue}</p>
                  </TableCell>
                  <TableCell className="font-medium">{customer.openDealsCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${getHealthColor(customer.healthScore)}`}>{customer.healthScore}</span>
                      <div className="w-16 bg-secondary h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${getHealthBg(customer.healthScore)}`} style={{ width: `${customer.healthScore}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem><FilePlus2 className="w-4 h-4 mr-2"/> Create Deal</DropdownMenuItem>
                          <DropdownMenuItem><Calendar className="w-4 h-4 mr-2"/> Schedule Meeting</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No customers found matching your search.
        </div>
      )}
    </div>
  );
}
