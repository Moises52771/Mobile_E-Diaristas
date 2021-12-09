import React from "react";
import { UserName, UserInformationContainer, UserDescription, InformationContainer, RatingStyled } from "./UserInformation.style";
import { Avatar } from "react-native-paper";


export interface UserInformationProps{
    picture: string;
    name: string;
    rating: number;
    description?: string;
    darker?: boolean;
}

const UserInformation: React.FC<UserInformationProps> = (props) => {
    return(
        <UserInformationContainer darker={Boolean(props.darker)}> 
            <Avatar.Image source={{ uri: props.picture }} />
            <InformationContainer>
                <UserName>
                    {props.name}
                </UserName>
                <RatingStyled defaultRating={props.rating}/>
                <UserDescription>
                    {props.description}
                </UserDescription>
            </InformationContainer>
        </UserInformationContainer>
    );
};

export default UserInformation;