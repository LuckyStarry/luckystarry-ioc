import { ClassPool } from './class-pool'
import { ClassType } from './class-type'
import { Injectable } from './injectable'
import { IServiceCollection, ServiceCollection } from './service-collection'
export { IServiceCollection, ServiceCollection }
export { ClassType }
export { ClassPool }
export { Injectable }

export const Default: IServiceCollection = new ServiceCollection()
export const AddTransient = Default.AddTransient
export const AddSingleton = Default.AddSingleton
export const GetService = Default.GetService

export default Default
