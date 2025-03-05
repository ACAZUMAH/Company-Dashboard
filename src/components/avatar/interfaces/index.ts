import { AvatarProps } from "antd";

export type Props = AvatarProps & {
    name?: string
}

export interface options {
    name: string
    avatarUrl?: string
    shape?: 'circle' | 'square' 
}