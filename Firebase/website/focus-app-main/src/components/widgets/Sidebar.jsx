import React from 'react';
import Text from '../elements/Text';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="text-white md:block hidden">
            <ul>
                <Text className="md:block hidden text-2xl pl-4 mt-6 font-bold mb-12">
                    TB<span className="text-tertiary">Kit</span>
                </Text>

                <div className='flex flex-col md:hidden items-center justify-between p-4 mt-6 space-y-6   mb-12'>
                    <Text className="text-sm "> X </Text>
                    <Text className="text-2xl font-bold">
                        T<span className="text-tertiary">K</span>
                    </Text>


                </div>


                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        isActive ? "bg-secondary w-full block border-l-2 border-l-tertiary mr-2 py-3  text-sm"
                            :
                            "mr-2 text-sm py-3 "
                    }
                >
                    <li className="p-4 ">
                        Home
                    </li>
                </NavLink>

                <NavLink
                    to="/survey"
                    className={({ isActive }) =>
                        isActive ? "bg-secondary w-full block border-l-2 border-l-tertiary mr-2 py-3  text-sm"
                            :
                            "mr-2 text-sm py-3 pl-4"
                    }
                >
                    <li className="p-4">
                        Survey
                    </li>
                </NavLink>
                <NavLink
                    to="/nitrictest"
                    className={({ isActive }) =>
                        isActive ? "bg-secondary w-full block border-l-2 border-l-tertiary mr-2 py-3  text-sm"
                            :
                            "mr-2 text-sm py-3 pl-4"
                    }
                >
                    <li className="p-4">
                        Nitric Test
                    </li>
                </NavLink>
                <NavLink
                    to="/instructions"
                    className={({ isActive }) =>
                        isActive ? "bg-secondary w-full block border-l-2 border-l-tertiary mr-2 py-3  text-sm"
                            :
                            "mr-2 text-sm py-3 pl-4"
                    }
                >
                    <li className="p-4">
                        Instructions
                    </li>
                </NavLink>

                <NavLink
                    to="/prediction"
                    className={({ isActive }) =>
                        isActive ? "bg-secondary w-full block border-l-2 border-l-tertiary mr-2 py-3  text-sm"
                            :
                            "mr-2 text-sm py-3 pl-4"
                    }
                >
                    <li className="p-4">
                        Prediction
                    </li>
                </NavLink>
                <NavLink
                    to="/analytics"
                    className={({ isActive }) =>
                        isActive ? "bg-secondary w-full block border-l-2 border-l-tertiary mr-2 py-3  text-sm"
                            :
                            "mr-2 text-sm py-3 pl-4"
                    }
                >
                    <li className="p-4">
                        Analytics
                    </li>
                </NavLink>
            


            </ul>
        </aside>
    )
}

export default Sidebar