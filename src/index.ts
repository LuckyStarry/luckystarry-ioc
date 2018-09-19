import { IServiceCollection, ServiceCollection } from './service-collection'
export { IServiceCollection, ServiceCollection }
import { ClassType } from './class-type'
export { ClassType }
import { ClassPool } from './class-pool'
export { ClassPool }
import { Injectable } from './injectable'
export { Injectable }

export const Default: IServiceCollection = new ServiceCollection()
export const AddTransient = Default.AddTransient
export const AddSingleton = Default.AddSingleton
export const GetService = Default.GetService

export default Default
