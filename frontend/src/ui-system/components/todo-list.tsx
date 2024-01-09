import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

const TodoList = () => {
    return (
        <div className="static">
            <AlertDialog>
                <AlertDialogTrigger className="absolute bg-green-300 border-green-400  text-sm font-semibold top-4 right-4">Open tasks</AlertDialogTrigger>
                <AlertDialogContent className="fixed inset-0 max-h-full z-50 bg-white p-16 overflow-y-auto">
                    <AlertDialogCancel className="absolute bg-red-300 border-red-400  text-sm font-semibold top-4 right-4 z-10">Close tasks</AlertDialogCancel>
                    <div>
                        <h2 className="text-xl font-semibold text-indigo-700">
                            Bondbridge (CRM Clone) to do list
                        </h2>
                        <ol className="list-decimal pl-4">
                            <li className="">
                                [x] Auth service
                                <ul className="list-none pl-4">
                                    <li>[x] .NET user registration and login classes/auth controller</li>
                                    <li>[x] ApiKey middleware to prevent unauthorized access to registration api</li>
                                    <li>[x] NextJS registration form (server side) to create account and automatically log user in with JWT response</li>
                                    <li>[x] NextJS login/log out functionality</li>
                                </ul>
                            </li>
                            <li>
                                [ ] Contact service
                                <ul className="list-none pl-4">
                                    <li>[ ] (UI) index, dynamic pages, CRUD forms/controls</li>
                                    <li>[ ] (.NET) classes, controllers, endpoints</li>
                                    <li>[ ] (APIs) Connect ui to backend APIs</li>
                                </ul>
                            </li>
                            <li>
                                [ ] Organisation service
                                <ul className="list-none pl-4">
                                    <li>[ ] (UI) index, dynamic pages, CRUD forms/controls</li>
                                    <li>[ ] (.NET) classes, controllers, endpoints</li>
                                    <li>[ ] (APIs) Connect ui to backend APIs</li>
                                </ul>
                            </li>
                            <li>
                                [ ] Connection service
                                <ul className="list-none pl-4">
                                    <li>[ ] (UI) index, dynamic pages, CRUD forms/controls</li>
                                    <li>[ ] (.NET) classes, controllers, endpoints</li>
                                    <li>[ ] (APIs) Connect ui to backend APIs</li>
                                </ul>
                            </li>
                            <li>
                                [ ] Action service
                                <ul className="list-none pl-4">
                                    <li>[ ] (UI) index, dynamic pages, CRUD forms/controls</li>
                                    <li>[ ] (.NET) classes, controllers, endpoints</li>
                                    <li>[ ] (APIs) Connect ui to backend APIs</li>
                                </ul>
                            </li>
                            <li>
                                [ ] Connection service
                                <ul className="list-none pl-4">
                                    <li>[ ] (UI) index, dynamic pages, CRUD forms/controls</li>
                                    <li>[ ] (.NET) classes, controllers, endpoints</li>
                                    <li>[ ] (APIs) Connect ui to backend APIs</li>
                                </ul>
                            </li>
                            <li>
                                [ ] Message service
                                <ul className="list-none pl-4">
                                    <li>[ ] (UI) index, dynamic pages, CRUD forms/controls</li>
                                    <li>[ ] (.NET) classes, controllers, endpoints</li>
                                    <li>[ ] (APIs) Connect ui to backend APIs</li>
                                </ul>
                            </li>
                            <li>
                                [ ] App service
                                <ul className="list-none pl-4">
                                    <li>[ ] App settings page</li>
                                    <li>[ ] Home page</li>
                                    <li>[ ] Logged in/out state</li>
                                </ul>
                            </li>
                        </ol>
                    </div>



                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default TodoList;