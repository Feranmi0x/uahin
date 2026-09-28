"use client";

import { useEffect, useMemo, useState } from "react";
import NextImage from "next/image";
import { signOut } from "next-auth/react";
import {
  Activity, BookOpenText, ChevronLeft, ChevronRight, CircleDollarSign,
  ClipboardList, Image, LayoutDashboard, LogOut, Mail, Menu, Plus,
  Search, ShieldCheck, Users, X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "../ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "donations", label: "Donations", icon: CircleDollarSign },
  { id: "registrations", label: "Registrations", icon: ClipboardList },
  { id: "supporters", label: "Supporters", icon: Users },
  { id: "programmes", label: "Programmes", icon: Activity },
  { id: "stories", label: "Stories", icon: BookOpenText },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "newsletter", label: "Newsletter", icon: Mail },
  { id: "impact-stats", label: "Impact stats", icon: ShieldCheck },
];

const columns = {
  donations: ["donorEmail", "amount", "currency", "status", "reference", "createdAt"],
  registrations: ["fullName", "communityTown", "state", "membershipStatus", "createdAt"],
  supporters: ["name", "role", "active", "sortOrder"],
  programmes: ["title", "location", "active", "sortOrder"],
  stories: ["title", "category", "author", "featured", "createdAt"],
  gallery: ["title", "location", "active", "sortOrder"],
  newsletter: ["name", "email", "phone", "state", "createdAt"],
  "impact-stats": ["value", "label", "active", "sortOrder"],
};

const editableFields = {
  supporters: ["name", "role", "description", "image", "active", "sortOrder"],
  programmes: ["title", "location", "stat", "description", "image", "active", "sortOrder"],
  stories: ["title", "slug", "category", "excerpt", "author", "date", "image", "content", "featured"],
  gallery: ["title", "description", "image", "location", "active", "sortOrder"],
  "impact-stats": ["value", "label", "active", "sortOrder"],
};

const fieldLabels = {
  donorEmail: "Donor email", amount: "Amount", currency: "Currency", status: "Payment status",
  reference: "Reference", createdAt: "Date", fullName: "Full name", communityTown: "Community / town",
  membershipStatus: "Membership status", name: "Name", role: "Role", active: "Active",
  state: "State",
  sortOrder: "Sort order", title: "Title", location: "Location", category: "Category", author: "Author",
  featured: "Featured", email: "Email", phone: "Phone", value: "Value", label: "Label",
  stat: "Stat", description: "Description", image: "Image path", slug: "Slug", excerpt: "Excerpt",
  date: "Published date", content: "Full story", firstName: "First name", lastName: "Last name",
  state: "State", registration: "Registration details", frequency: "Frequency", donorFirstName: "First name",
  donorLastName: "Last name", donorPhone: "Phone", updatedAt: "Updated", gatewayResponse: "Gateway response",
  id: "Record ID",
};

const metricDefinitions = [
  ["Donations", (stats) => stats?.donations?.total, CircleDollarSign],
  ["Successful payments", (stats) => stats?.donations?.successful, ShieldCheck],
  ["Amount received", (stats) => stats?.donations?.amountReceived == null ? null : formatNaira(stats.donations.amountReceived), CircleDollarSign],
  ["Pending / failed", (stats) => stats?.donations?.pendingOrFailed, Activity],
  ["Community registrations", (stats) => stats?.registrations, ClipboardList],
  ["Supporters", (stats) => stats?.supporters, Users],
  ["Active programmes", (stats) => stats?.activeProgrammes == null || stats?.programmes == null ? null : `${stats.activeProgrammes} / ${stats.programmes}`, Activity],
  ["Stories", (stats) => stats?.stories, BookOpenText],
  ["Gallery items", (stats) => stats?.gallery, Image],
  ["Newsletter subscribers", (stats) => stats?.subscribers, Mail],
  ["Impact measures", (stats) => stats?.impactStats, ShieldCheck],
];

function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(Number(amount) || 0);
}

function recordForSection(section, row) {
  if (section === "registrations") return row.registration || {};
  return row;
}

function valueFor(section, row, key) {
  const record = recordForSection(section, row);
  if (section === "newsletter" && key === "name") return [row.firstName, row.lastName].filter(Boolean).join(" ") || "—";
  if (key === "fullName") return record.fullName || record.applicantName || "—";
  const value = key === "createdAt" || key === "updatedAt" ? row[key] : record[key];
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Active" : "Inactive";
  if (key === "amount") return formatNaira(value);
  if (["createdAt", "updatedAt"].includes(key)) return new Date(value).toLocaleDateString("en-NG", { dateStyle: "medium" });
  if (Array.isArray(value)) return value.join(", ") || "—";
  return String(value);
}

function statusVariant(value) {
  if (["success", "true", "Active", "Verified"].includes(String(value))) return "secondary";
  if (["failed", "cancelled", "false", "Inactive"].includes(String(value))) return "destructive";
  return "outline";
}

function displayValue(value) {
  if (value === null || value === undefined || value === "") return "Not provided";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ") || "None selected";
  return String(value);
}

export default function AdminDashboard({ adminEmail }) {
  const [section, setSection] = useState("overview");
  const [stats, setStats] = useState(null);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "", direction: "desc" });
  const [filters, setFilters] = useState({ status: "", from: "", to: "", minAmount: "", maxAmount: "", active: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [detailRow, setDetailRow] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [saving, setSaving] = useState(false);

  const selectedSection = sections.find((item) => item.id === section) || sections[0];
  const canCreate = Boolean(editableFields[section]);

  async function loadOverview() {
    const response = await fetch("/api/admin/overview", { cache: "no-store" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to load overview.");
    setStats(result);
  }

  async function loadRows(targetPage = page) {
    const params = new URLSearchParams({ section, page: String(targetPage), q: search });
    if (sort.key) {
      params.set("sort", sort.key);
      params.set("direction", sort.direction);
    }
    Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value); });
    const response = await fetch(`/api/admin/data?${params}`, { cache: "no-store" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to load records.");
    setRows(result.rows || []);
    setTotal(result.total || 0);
    setPage(result.page || 1);
    setPages(result.pages || 1);
  }

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      if (section === "overview") await loadOverview();
      else await loadRows(page);
    } catch (loadError) {
      setError(loadError.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(1);
    setSearch("");
    setFilters({ status: "", from: "", to: "", minAmount: "", maxAmount: "", active: "" });
  }, [section]);

  useEffect(() => {
    const timeout = setTimeout(() => { refresh(); }, search ? 250 : 0);
    return () => clearTimeout(timeout);
  }, [section, page, search, filters, sort]);

  async function saveRecord(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const body = {};
    for (const field of editableFields[section] || []) {
      const value = formData.get(field);
      if (["active", "featured"].includes(field)) body[field] = value === "true";
      else if (field === "sortOrder") body[field] = Number(value || 0);
      else body[field] = String(value || "");
    }
    if (editRow?.id) body.id = editRow.id;
    try {
      const response = await fetch(`/api/admin/${section}`, {
        method: editRow?.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save record.");
      setEditRow(null);
      setNotice(editRow?.id ? "Record updated." : "Record created.");
      await refresh();
    } catch (saveError) {
      setError(saveError.message || "Unable to save record.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteRecord() {
    if (!deleteRow) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/${section}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteRow.id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to delete record.");
      setDeleteRow(null);
      setNotice("Record deleted.");
      await refresh();
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete record.");
      setDeleteRow(null);
    } finally {
      setSaving(false);
    }
  }

  const sectionColumns = useMemo(() => columns[section] || [], [section]);

  return (
    <div className="min-h-screen bg-[#f5f7f5] text-secondary-foreground">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-62.5 flex-col border-r border-[#dce5df] bg-white transition-transform lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
        <a href="/admin" className="flex h-18 items-center gap-3 border-b border-[#e7ece8] px-5">
          <NextImage src="/logo.JPG" alt="" width={40} height={40} className="size-9 shrink-0 rounded-[5px] object-cover" />
          <span><strong className="block text-sm tracking-wide">UAHIN</strong><small className="text-[10px] tracking-[0.13em] text-[#718078]">ADMINISTRATION</small></span>
        </a>
        <nav aria-label="Admin navigation" className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#839087]">Workspace</p>
          {sections.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => { setSection(id); setMobileNav(false); }} className={`flex min-h-10 w-full items-center gap-3 rounded-[5px] px-3 text-left text-sm transition ${section === id ? "bg-[#eaf2ec] font-semibold text-primary" : "text-[#5e7067] hover:bg-[#f4f7f4] hover:text-secondary-foreground"}`} aria-current={section === id ? "page" : undefined}>
              <Icon size={17} aria-hidden="true" />{label}
            </button>
          ))}
        </nav>
        <div className="border-t border-[#e7ece8] p-4">
          <p className="truncate text-xs font-medium text-[#344a40]">{adminEmail}</p>
          <button type="button" onClick={() => signOut({ callbackUrl: "/admin/login" })} className="mt-3 flex w-full items-center gap-2 rounded-[5px] px-2 py-2 text-sm text-muted-foreground hover:bg-[#f4f7f4] hover:text-[#a6382b]">
            <LogOut size={16} aria-hidden="true" /> Sign out
          </button>
        </div>
      </aside>
      {mobileNav && <button className="fixed inset-0 z-30 bg-black/25 lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}

      <div className="min-h-screen lg:pl-62.5">
        <header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-[#dce5df] bg-white/95 px-4 backdrop-blur-sm sm:px-7">
          <div className="flex items-center gap-3">
            <button className="grid size-9 place-items-center rounded-[5px] border border-[#dce5df] lg:hidden" type="button" onClick={() => setMobileNav(!mobileNav)} aria-label={mobileNav ? "Close navigation" : "Open navigation"}>
              {mobileNav ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#839087]">UAHIN admin</p><h1 className="text-base font-semibold leading-6">{selectedSection.label}</h1></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-52 truncate text-xs text-muted-foreground sm:inline">{adminEmail}</span>
            <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>Refresh</Button>
          </div>
        </header>

        <main className="mx-auto max-w-375 px-4 py-6 sm:px-7 sm:py-8">
          {error && <div className="mb-5 flex items-start justify-between gap-4 border-l-4 border-[#a6382b] bg-[#fff5f3] px-4 py-3 text-sm text-[#772e25]" role="alert"><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
          {notice && <div className="mb-5 flex items-start justify-between gap-4 border-l-4 border-[#1a6658] bg-[#edf5ef] px-4 py-3 text-sm text-[#244d3e]" role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={16} /></button></div>}

          {section === "overview" ? (
            <>
              <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a6658]">Organisation at a glance</p><h2 className="mt-2 text-2xl font-semibold">Overview</h2></div>
                <p className="text-sm text-[#718078]">Live totals from UAHIN’s database</p>
              </div>
              {loading && !stats ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{metricDefinitions.map(([label]) => <div key={label} className="h-28 animate-pulse rounded-[5px] border border-[#e0e7e2] bg-white" />)}</div> : stats ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{metricDefinitions.map(([label, value, Icon]) => <Card key={label} className="rounded-[5px] border border-[#e0e7e2] py-0 shadow-none ring-0"><CardHeader className="flex grid-cols-[1fr_auto] items-start gap-3 px-4 pt-4 pb-0"><CardTitle className="text-xs font-medium text-muted-foreground">{label}</CardTitle><Icon size={17} className="text-[#1a6658]" aria-hidden="true" /></CardHeader><CardContent className="px-4 pt-2 pb-4"><p className="text-2xl font-semibold tabular-nums text-secondary-foreground">{value(stats) ?? "Unavailable"}</p></CardContent></Card>)}</div> : <p className="text-sm text-muted-foreground">No overview data is available.</p>}
              {stats?.unavailable?.length > 0 && <div className="mt-5 border-l-4 border-[#d8a95f] bg-[#fbfaf6] px-4 py-3 text-sm leading-6 text-[#4f5e55]" role="status">Some database sections are not available yet: {stats.unavailable.map((key) => key === "registrations" ? "Membership registrations (apply the additive registration migration)" : key).join(", ")}.</div>}
              <section className="mt-9 border-t border-[#dce5df] pt-6"><h3 className="font-semibold">Administration notes</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">Donation and registration records are available for review only. Public content can be created, edited, activated, and removed from its section. Statistics reflect stored database records; no sample figures are used.</p></section>
            </>
          ) : (
            <>
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a6658]">Database records</p><h2 className="mt-2 text-2xl font-semibold">{selectedSection.label}</h2><p className="mt-1 text-sm text-[#718078]">{total.toLocaleString()} {total === 1 ? "record" : "records"}</p></div>
                {canCreate && <Button onClick={() => setEditRow({})}><Plus size={16} /> Add {section === "programmes" ? "programme" : section === "impact-stats" ? "impact stat" : section.slice(0, -1)}</Button>}
              </div>
              <div className="mb-4 flex flex-col gap-3 border-y border-[#e0e7e2] py-4 xl:flex-row xl:items-center xl:justify-between">
                <label className="relative block w-full xl:max-w-sm"><Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-[#839087]" aria-hidden="true" /><span className="sr-only">Search {selectedSection.label.toLowerCase()}</span><input className="h-10 w-full rounded-[5px] border border-[#d3ded7] bg-white pr-3 pl-9 text-sm outline-none focus:border-[#1a6658] focus:ring-2 focus:ring-[#1a6658]/15" placeholder={`Search ${selectedSection.label.toLowerCase()}…`} value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} /></label>
                {section === "donations" && <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:flex xl:flex-wrap">
                  <select aria-label="Filter by payment status" className="h-10 min-w-32 rounded-[5px] border border-[#d3ded7] bg-white px-2 text-sm" value={filters.status} onChange={(event) => { setFilters({ ...filters, status: event.target.value }); setPage(1); }}><option value="">All statuses</option><option value="success">Success</option><option value="initialized">Pending</option><option value="failed">Failed</option><option value="cancelled">Cancelled</option></select>
                  <input aria-label="From date" className="h-10 min-w-32 rounded-[5px] border border-[#d3ded7] bg-white px-2 text-sm" type="date" value={filters.from} onChange={(event) => { setFilters({ ...filters, from: event.target.value }); setPage(1); }} />
                  <input aria-label="To date" className="h-10 min-w-32 rounded-[5px] border border-[#d3ded7] bg-white px-2 text-sm" type="date" value={filters.to} onChange={(event) => { setFilters({ ...filters, to: event.target.value }); setPage(1); }} />
                  <input aria-label="Minimum amount" className="h-10 min-w-28 rounded-[5px] border border-[#d3ded7] bg-white px-2 text-sm" placeholder="Min ₦" type="number" min="0" value={filters.minAmount} onChange={(event) => { setFilters({ ...filters, minAmount: event.target.value }); setPage(1); }} />
                  <input aria-label="Maximum amount" className="h-10 min-w-28 rounded-[5px] border border-[#d3ded7] bg-white px-2 text-sm" placeholder="Max ₦" type="number" min="0" value={filters.maxAmount} onChange={(event) => { setFilters({ ...filters, maxAmount: event.target.value }); setPage(1); }} />
                </div>}
                {["supporters", "programmes", "gallery", "impact-stats"].includes(section) && <select aria-label="Filter by active status" className="h-10 rounded-[5px] border border-[#d3ded7] bg-white px-3 text-sm" value={filters.active} onChange={(event) => { setFilters({ ...filters, active: event.target.value }); setPage(1); }}><option value="">All states</option><option value="true">Active</option><option value="false">Inactive</option></select>}
              </div>

              <div className="overflow-hidden rounded-[5px] border border-[#dce5df] bg-white">
                <Table>
                  <TableHeader className="bg-[#f7f9f7]"><TableRow>{sectionColumns.map((column) => <TableHead className="px-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground" key={column}><button type="button" className="inline-flex items-center gap-1.5 hover:text-secondary-foreground" onClick={() => { setSort((current) => ({ key: column, direction: current.key === column && current.direction === "asc" ? "desc" : "asc" })); setPage(1); }}>{fieldLabels[column] || column}{sort.key === column ? (sort.direction === "asc" ? " ↑" : " ↓") : ""}</button></TableHead>)}<TableHead className="w-36 px-4 text-right text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Record</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {loading ? <TableRow><TableCell className="h-24 px-4 text-sm text-[#718078]" colSpan={sectionColumns.length + 1}>Loading records…</TableCell></TableRow> : rows.length ? rows.map((row) => <TableRow key={row.id}>
                      {sectionColumns.map((column) => {
                        const value = valueFor(section, row, column);
                        const isBadge = ["status", "active", "featured"].includes(column);
                        return <TableCell key={column} className="max-w-64 truncate px-4 py-3 text-sm">{isBadge ? <Badge className="rounded-sm" variant={statusVariant(value)}>{value}</Badge> : value}</TableCell>;
                      })}
                      <TableCell className="px-4 py-3 text-right"><div className="inline-flex items-center gap-1"><Button variant="outline" size="sm" onClick={() => setDetailRow(row)}>View</Button>{editableFields[section] && <><Button variant="ghost" size="sm" onClick={() => setEditRow(row)}>Edit</Button><Button variant="ghost" size="sm" onClick={() => setDeleteRow(row)} aria-label={`Delete ${row.title || row.name || row.label || row.id}`}>Delete</Button></>}{section === "newsletter" && <Button variant="ghost" size="sm" onClick={() => setDeleteRow(row)} aria-label={`Delete ${row.email}`}>Delete</Button>}</div></TableCell>
                    </TableRow>) : <TableRow><TableCell className="h-28 px-4 text-center text-sm text-[#718078]" colSpan={sectionColumns.length + 1}>{error ? "Records could not be loaded." : "No records found for this view."}</TableCell></TableRow>}
                  </TableBody>
                </Table>
                <div className="flex flex-col gap-3 border-t border-[#e5ebe7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-[#718078]">Page {page} of {pages} · {total.toLocaleString()} records</p><div className="flex items-center gap-2"><Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage(Math.max(1, page - 1))}><ChevronLeft size={15} /> Previous</Button><Button variant="outline" size="sm" disabled={page >= pages || loading} onClick={() => setPage(Math.min(pages, page + 1))}>Next <ChevronRight size={15} /></Button></div></div>
              </div>
            </>
          )}
        </main>
      </div>

      <Dialog open={Boolean(detailRow)} onOpenChange={(open) => { if (!open) setDetailRow(null); }}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-[5px]">
          <DialogHeader><DialogTitle className="text-lg">{section === "registrations" ? "Community registration" : `${selectedSection.label} record`}</DialogTitle><DialogDescription>Stored record details. Sensitive registration data is restricted to authenticated administrators.</DialogDescription></DialogHeader>
          {detailRow && <dl className="grid gap-x-5 gap-y-4 sm:grid-cols-2">{Object.entries({ ...recordForSection(section, detailRow), id: detailRow.id, createdAt: detailRow.createdAt }).map(([key, value]) => <div className="min-w-0 border-b border-[#e5ebe7] pb-3" key={key}><dt className="text-[11px] font-semibold uppercase tracking-wide text-[#718078]">{fieldLabels[key] || key.replace(/[A-Z]/g, (letter) => ` ${letter}`).trim()}</dt><dd className="mt-1 wrap-break-word text-sm text-[#263d33]">{displayValue(value)}</dd></div>)}</dl>}
          <DialogFooter><Button variant="outline" onClick={() => setDetailRow(null)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editRow)} onOpenChange={(open) => { if (!open && !saving) setEditRow(null); }}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-[5px]">
          <DialogHeader><DialogTitle>{editRow?.id ? "Edit" : "Create"} {selectedSection.label.toLowerCase().replace(/s$/, "")}</DialogTitle><DialogDescription>Changes are saved directly to the UAHIN database.</DialogDescription></DialogHeader>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={saveRecord}>
            {(editableFields[section] || []).map((field) => {
              const isBoolean = ["active", "featured"].includes(field);
              const isNumber = field === "sortOrder";
              const multiline = ["description", "excerpt", "content"].includes(field);
              const initialValue = editRow?.[field];
              return <label className={`block text-sm font-medium text-[#344a40] ${multiline ? "sm:col-span-2" : ""}`} key={field}>{fieldLabels[field] || field}
                {isBoolean ? <select className="mt-2 h-10 w-full rounded-[5px] border border-[#d3ded7] bg-white px-3 text-sm" name={field} defaultValue={String(initialValue ?? (field === "active"))}><option value="true">Yes</option><option value="false">No</option></select> : multiline ? <textarea className="mt-2 min-h-24 w-full rounded-[5px] border border-[#d3ded7] bg-white px-3 py-2 text-sm outline-none focus:border-[#1a6658]" name={field} defaultValue={initialValue ?? ""} required={field === "content" || field === "description"} /> : <input className="mt-2 h-10 w-full rounded-[5px] border border-[#d3ded7] bg-white px-3 text-sm outline-none focus:border-[#1a6658]" name={field} type={isNumber ? "number" : "text"} min={isNumber ? 0 : undefined} defaultValue={initialValue ?? (isBoolean ? true : "")} required={["title", "name", "role", "location", "stat", "image", "value", "label", "category", "excerpt", "author", "date"].includes(field)} />}
              </label>;
            })}
            {error && <p className="sm:col-span-2" role="alert">{error}</p>}
            <DialogFooter className="sm:col-span-2"><Button type="button" variant="outline" disabled={saving} onClick={() => setEditRow(null)}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleteRow)} onOpenChange={(open) => { if (!open && !saving) setDeleteRow(null); }}>
        <DialogContent className="rounded-[5px]">
          <DialogHeader><DialogTitle>Delete this record?</DialogTitle><DialogDescription>This permanently removes {deleteRow?.email || deleteRow?.title || deleteRow?.name || deleteRow?.label || "the selected record"} from the database. This action cannot be undone.</DialogDescription></DialogHeader>
          {error && <p role="alert" className="text-sm text-[#a6382b]">{error}</p>}
          <DialogFooter><Button variant="outline" disabled={saving} onClick={() => setDeleteRow(null)}>Cancel</Button><Button variant="destructive" disabled={saving} onClick={deleteRecord}>{saving ? "Deleting…" : "Delete record"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}