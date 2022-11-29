import { useEffect, useState } from 'react';

import { AccountOverview } from '../components/accountOverview/AccountOverview';
import { Disclaimer } from '../components/disclaimer/Disclaimer';
import { Footer } from '../components/footer/Footer';
import { Page } from '../components/page/Page';
import { Stats } from '../components/stats/Stats';
import { VestingOverview } from '../components/vestingOverview/VestingOverview';
import { Widgets } from '../components/widgets/Widgets';

export const Main = () => {
    const [isDisclaimerAccepter, setIsDisclaimerAccepted] = useState(false);
    useEffect(() => {
        setIsDisclaimerAccepted(
            localStorage.getItem('isDisclaimerAccepter') === 'true',
        );
    }, []);
    const acceptDisclaimer = () => {
        localStorage.setItem('isDisclaimerAccepter', 'true');
        setIsDisclaimerAccepted(true);
    };
    return isDisclaimerAccepter ? (
        <Page>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full h-[670px] flex justify-between py-6">
                    <div className="w-[66%]">
                        <AccountOverview />
                    </div>
                    <div className="w-[31%]">
                        <Stats />
                    </div>
                </div>
                <div className="w-full h-[650px] py-6">
                    <Widgets />
                </div>
                <div className="w-full h-[630px] py-6">
                    <VestingOverview />
                </div>
                <div className="w-full h-[260px] pt-6 pb-10">
                    <Footer />
                </div>
            </div>
        </Page>
    ) : (
        <Disclaimer onAcceptClick={acceptDisclaimer} />
    );
};
