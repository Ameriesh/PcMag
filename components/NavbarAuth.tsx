
// import React from "react";
// import Link from "next/link";

// import { Button } from "@/components/ui/button"; 
// import { toast } from "sonner";

// import { authClient, signOut } from "@/lib/auth-client";
// import { auth } from "@/lib/auth";

// const session = authClient.useSession()
  

// export const NavbarAuth = () => {


//   // const {
//   //   data: session, 
//   //   isPending: loading, 
   
//   // } = useSession();

  
//   // const handleLogout = async () => {
   
//   //   await signOut(); 
    
//   //   window.location.href = "/"; 
//   // };

  
//   // if (loading) {
//   //   return <span>Chargement...</span>;
//   // }

  
//   // const isLoggedIn = !!session && !!session.user;

//   return (
//     // <div className="flex items-center gap-3">
//     //   {session && session.data? (
//     //     <>
          
//     //       <span className="text-primary-500 font-semibold">
//     //         {session.data.user.name || session.data.user.email}
//     //       </span>
//     //       <form action={ async () =>{
//     //           "use server"
//     //           await authClient.signOut({
//     //             fetchOptions: {
//     //               onSuccess: () =>{
//     //                 toast.success("sucess",{
//     //                   description: "deconnecter avec success"
//     //                 })
//     //               }
//     //             }
//     //           })
              

//     //       }}>
//     //         <Button>Deconnextion</Button>
//     //       </form>
          
//     //     </>
      
        
        
//     //   ) : (
        
//     //     <>
//     //       <Link href="/auth/signin">
//     //         <Button className="btn-secondary">Connexion</Button>
//     //       </Link>
//     //     </>
//     //   )}
//     // </div>
//   );
// };