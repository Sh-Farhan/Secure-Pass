// import {
//     Table,
//     TableBody,
//     TableHead,
//     TableHeader,
//     TableRow,
//     TableCell,
//   } from "@/components/ui/table";
//   import { MdDelete } from "react-icons/md";
//   import { MdEdit } from "react-icons/md";
  
//   export function TableDemo({ data, deleteHandler }) {
//     return (
//       <div>
// {    data.length > 0 ? <div className="w-1/2 container mx-auto border-4 rounded-xl border-slate-100 bg-slate-950/50 mt-3.5">
//         {/* Add height and overflow to the table container */}
//         <div className="max-h-72 overflow-y-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Site</TableHead>
//                 <TableHead className="text-center">Username</TableHead>
//                 <TableHead className="text-right">Password</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data.map((item) => (
//                 <TableRow key={item.site}>
//                   <TableCell><a target="_blank" href={item.site}>{item.site}</a></TableCell>
//                   <TableCell className="text-center">{item.username}</TableCell>
//                   <TableCell className="text-right">{item.password}</TableCell>
//                   <TableCell>
//                     <div className="flex flex-row-reverse gap-2">
//                       <span>
//                         <MdDelete size={20} onClick={() => deleteHandler(item.id)} />
//                       </span>
//                       <span>
//                         <MdEdit size={20} />
//                       </span>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div> : <div className="container mx-auto mb-60 flex justify-center items-center mt-10">No Passwords to show !</div>}
//       </div>
//     );
//   }
  
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, ExternalLink } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function TableDemo({ data, deleteHandler }) {
  return (
    <div className="container mx-auto">
      {data.length > 0 ? (
        <div className="bg-black shadow-lg rounded-lg overflow-hidden">
          <ScrollArea className="h-[200px]">
            <Table>
              <TableCaption>Your saved passwords</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Site</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <a
                        href={item.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-primary"
                      >
                        {item.site}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>
                      <span className="font-mono bg-gray-900 px-2 py-1 rounded">
                        {item.password}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {/* Add edit functionality */}}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteHandler(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      ) : (
        <div className="text-center bg-black shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-700">No Passwords to show!</h3>
          <p className="mt-2 text-gray-500">Add some passwords to see them here.</p>
        </div>
      )}
    </div>
  )
}