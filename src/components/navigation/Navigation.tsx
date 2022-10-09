import { useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '../button/Button';
import { ButtonWithIcon } from '../button/ButtonWithIcon';
import copyIcon from './../../assets/icons/copy-icon.svg';
import keyIcon from './../../assets/icons/key-icon.svg';
import horizontalLogo from './../../assets/icons/horizontal-logo.png';
import { formatAddress } from '../../utils/formatAddress';
import { WalletConnectContext } from '../../context';
import { GradientButtonWithIcon } from '../button/gradient/GradientButtonWithIcon';

export const Navigation = () => {
    const { account, activateBrowserWallet } = useContext(WalletConnectContext);

    const activate = async () => {
        await activateBrowserWallet();
    };

    const balance = '3600 LAKE | 1.2 ETH';
    return (
        <nav className="relative flex flex-wrap items-center justify-between px-8 py-2 bg-black-500">
            <div className="w-full flex flex-wrap items-center justify-between">
                <div>
                    <img
                        className="w-[24rem] pl-8"
                        src={horizontalLogo}
                        alt="logo"
                    ></img>
                </div>

                <div className="flex items-center justify-end">
                    {!!account ? (
                        <>
                            <Button disabled={true} text={balance}></Button>
                            <div className="ml-6">
                                <ButtonWithIcon
                                    disabled={true}
                                    text={formatAddress(account)}
                                >
                                    <CopyToClipboard text={account}>
                                        <button>
                                            <img
                                                src={copyIcon}
                                                alt="copy"
                                            ></img>
                                        </button>
                                    </CopyToClipboard>
                                </ButtonWithIcon>
                            </div>
                        </>
                    ) : (
                        <GradientButtonWithIcon
                            disabled={false}
                            text="CONNECT WALLET"
                            onClick={activate}
                        >
                            <img src={keyIcon} alt="copy"></img>
                        </GradientButtonWithIcon>
                    )}
                </div>
            </div>
        </nav>
    );
};
