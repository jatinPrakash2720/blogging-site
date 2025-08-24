import React, { useState, useEffect } from "react";
// Import all your common components
import Button from "../components/common/wrappers/Button";
import Avatar from "../components/common/wrappers/Avatar";
import Input from "../components/common/wrappers/Input";
import Textarea from "../components/common/wrappers/Textarea";
import Checkbox from "../components/common/wrappers/Checkbox";
import Badge from "../components/common/wrappers/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/common/wrappers/Card";
import Skeleton from "../components/common/wrappers/Skeleton";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../components/common/wrappers/Alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/common/wrappers/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/common/wrappers/DropdownMenu";
import Label from "../components/common/wrappers/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/common/wrappers/Popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/common/wrappers/Tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/common/wrappers/Tooltip";
import { Toaster, toast } from "../components/common/wrappers/Toast";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../components/common/wrappers/ToggleGroup";
import Toggle from "../components/common/wrappers/Toggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/common/wrappers/Select";
import Separator from "../components/common/wrappers/Separator";
import Switch from "../components/common/wrappers/Switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "../components/common/wrappers/Sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/common/wrappers/Pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/common/wrappers/Accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/common/wrappers/Collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/common/wrappers/Command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../components/common/wrappers/ContextMenu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/common/wrappers/HoverCard";
import Progress from "../components/common/wrappers/Progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "../components/common/wrappers/RadioGroup";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../components/common/wrappers/Resizable";
import {
  ScrollArea,
  ScrollBar,
} from "../components/common/wrappers/ScrollArea";
import Slider from "../components/common/wrappers/Silder";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/common/wrappers/Table";
import { Calendar } from "../components/common/wrappers/Calendar";
import DatePicker from "../components/common/wrappers/DatePicker";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/common/wrappers/Drawer";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../components/common/wrappers/Menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/common/wrappers/NavigationMenu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/common/wrappers/Breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/common/wrappers/Carousel";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/common/wrappers/Chart";
import Combobox from "../components/common/wrappers/Combobox";
import { DataTable } from "../components/common/wrappers/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/common/wrappers/InputOTP";
import AspectRatio from "../components/common/wrappers/AspectRatio";

// Helper component to structure the playground
const ComponentSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
      {title}
    </h2>
    <div className="flex flex-wrap items-start gap-4">{children}</div>
  </div>
);

// Define the pages for pagination
const componentPages = [
  "Forms & Inputs",
  "Buttons & Indicators",
  "Overlays & Modals",
  "Data Display",
  "Navigation",
];

const ComponentPlayground = () => {
  const [theme, setTheme] = useState("light");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Mock data for components that need it
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
        <div className="container mx-auto p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Component Playground</h1>
            <Button onClick={toggleTheme} intent="secondary">
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </Button>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
            {componentPages.map((page, index) => (
              <Button
                key={page}
                intent={currentPage === index ? "primary" : "secondary"}
                className={
                  currentPage === index ? "bg-black hover:bg-gray-800" : ""
                }
                onClick={() => setCurrentPage(index)}
              >
                {page}
              </Button>
            ))}
          </div>

          {/* Render the current page of components */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            {currentPage === 0 && (
              <div>
                <ComponentSection title="Inputs & Labels">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email-example">Email</Label>
                    <Input
                      type="email"
                      id="email-example"
                      placeholder="Email"
                    />
                  </div>
                  <Textarea placeholder="Type your message here." />
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </ComponentSection>
                <ComponentSection title="Selection Controls">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms</Label>
                  </div>
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">Comfortable</Label>
                    </div>
                  </RadioGroup>
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </ComponentSection>
                <ComponentSection title="Dropdowns">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                    </SelectContent>
                  </Select>
                  <Combobox
                    options={[{ value: "next", label: "Next.js" }]}
                    onChange={() => {}}
                    placeholder="Select framework..."
                  />
                </ComponentSection>
                <ComponentSection title="Slider">
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className="w-[60%]"
                  />
                </ComponentSection>
              </div>
            )}

            {currentPage === 1 && (
              <div>
                <ComponentSection title="Buttons & Toggles">
                  <Button
                    intent="primary"
                    className="bg-black hover:bg-gray-800"
                  >
                    Primary
                  </Button>
                  <Button intent="secondary">Secondary</Button>
                  <Button intent="danger">Danger</Button>
                  <Toggle aria-label="Toggle bold">B</Toggle>
                  <ToggleGroup type="multiple">
                    <ToggleGroupItem value="bold">B</ToggleGroupItem>
                  </ToggleGroup>
                </ComponentSection>
                <ComponentSection title="Indicators & Badges">
                  <Avatar src="https://github.com/shadcn.png" />
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Progress value={progress} className="w-[60%]" />
                </ComponentSection>
              </div>
            )}

            {currentPage === 2 && (
              <div>
                <ComponentSection title="Overlays & Modals">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button intent="danger">Alert Dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button>Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>Popover content here.</PopoverContent>
                  </Popover>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>Tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent>Tooltip content here.</TooltipContent>
                  </Tooltip>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button>Hover Card</Button>
                    </HoverCardTrigger>
                    <HoverCardContent>Hover card content.</HoverCardContent>
                  </HoverCard>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button>Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button>Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Drawer Title</DrawerTitle>
                      </DrawerHeader>
                    </DrawerContent>
                  </Drawer>
                  <Button onClick={() => toast("A toast has appeared.")}>
                    Show Toast
                  </Button>
                </ComponentSection>
              </div>
            )}

            {currentPage === 3 && (
              <div>
                <ComponentSection title="Data Display">
                  <Card className="w-[350px]">
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                    </CardHeader>
                    <CardContent>Card Content</CardContent>
                  </Card>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Section 1</AccordionTrigger>
                      <AccordionContent>
                        Content for section 1.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button>Collapsible</Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      Collapsible content.
                    </CollapsibleContent>
                  </Collapsible>
                  <DataTable
                    columns={[{ accessorKey: "status", header: "Status" }]}
                    data={[{ status: "pending" }]}
                  />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Header</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Cell</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                  <DatePicker date={date} setDate={setDate} />
                  <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                      <CarouselItem>Slide 1</CarouselItem>
                    </CarouselContent>
                  </Carousel>
                  <ChartContainer
                    config={{ desktop: { label: "Desktop", color: "blue" } }}
                  >
                    <BarChart data={[{ month: "Jan", desktop: 100 }]}>
                      <Bar dataKey="desktop" />
                    </BarChart>
                  </ChartContainer>
                  <AspectRatio
                    ratio={16 / 9}
                    className="w-[300px] bg-muted flex items-center justify-center"
                  >
                    <p>16:9</p>
                  </AspectRatio>
                  <Separator />
                </ComponentSection>
              </div>
            )}

            {currentPage === 4 && (
              <div>
                <ComponentSection title="Navigation">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>File</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>New</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Item</NavigationMenuTrigger>
                        <NavigationMenuContent>Content</NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                      <TabsTrigger value="account">Account</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Account content.</TabsContent>
                  </Tabs>
                </ComponentSection>
              </div>
            )}
          </div>
        </div>
        <Toaster />
      </div>
    </TooltipProvider>
  );
};

export default ComponentPlayground;
