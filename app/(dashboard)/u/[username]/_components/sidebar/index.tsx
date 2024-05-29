import LocalWrapper from "./LocalWrapper";
import LocalToggle from "./LocalToggle";
import Navigation from "./Navigation";

export default function Sidebar() {
    return (
        <LocalWrapper>
            <LocalToggle />
            <Navigation />
        </LocalWrapper>
    );
}
