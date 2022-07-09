
export const TeamInfoContext = createContext<TeamInfoContextType>({} as {
    tinfoState: TeamInfoType;
    tinfoDispatch: Dispatch<TeamInfoActionType>;
})
type TeamInfo = {
    teamNames: string[]
    player
}