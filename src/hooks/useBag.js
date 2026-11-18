import { useContext } from 'react'
import { BagContext } from './bagContext'

export const useBag = () => useContext(BagContext)
