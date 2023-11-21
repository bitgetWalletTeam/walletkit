import { Box } from '@/base/components/Box';
import { Text } from '@/base/components/Text';
import { Button } from '@/base/components/Button';
import { DownArrowIcon } from '@/base/icons/DownArrowIcon';
import { Avatar } from '@/components/Avatar';
import { useChainConfig } from '@/hooks/useChainConfig';
import { useModal, cx } from '@/index';
import { truncateENSName, formatBalance, truncateAddress } from '@/utils/account';
import { useAccount, useBalance, useEnsName, useNetwork } from 'wagmi';
import { clsWalletkitButton } from '../styles.css';
import {
  clsInfo,
  clsWrongButton,
  clsChainButton,
  clsChainLogo,
  clsAccountButton,
  clsBalance,
  clsSeparator,
  clsAddress,
} from './styles.css';

export function ConnectedInfo() {
  const { address } = useAccount();

  const { onOpenProfile, onOpenSwitchNetwork } = useModal();

  const { data: ensName } = useEnsName({
    chainId: 1,
    address: address,
  });

  const { data: balance } = useBalance({
    address,
  });

  const { chain } = useNetwork();
  const chainConfig = useChainConfig(chain);

  return (
    <Box className={cx('wk-connected-button-group', clsInfo)}>
      {chain?.unsupported ? (
        <Button
          className={cx('wk-wrong-network-button', clsWalletkitButton, clsWrongButton)}
          onClick={() => onOpenSwitchNetwork()}
        >
          Wrong network
          <DownArrowIcon />
        </Button>
      ) : (
        <>
          <Button
            className={cx('wk-chain-button', clsWalletkitButton, clsChainButton)}
            onClick={() => onOpenSwitchNetwork()}
          >
            <Box className={clsChainLogo}>{chainConfig?.logo}</Box>
            <Box title={chainConfig.name}>{truncateENSName(chainConfig.name)}</Box>
            <DownArrowIcon />
          </Button>

          <Button
            className={cx('wk-account-button', clsWalletkitButton, clsAccountButton)}
            onClick={onOpenProfile}
          >
            {balance && (
              <>
                <Box className={cx('wk-account-balance', clsBalance)}>{formatBalance(balance)}</Box>
                <Box className={clsSeparator} />
              </>
            )}
            <Box className={cx('wk-account-address', clsAddress)}>
              <Avatar address={address} />
              <Text as="span">{ensName ? truncateENSName(ensName) : truncateAddress(address)}</Text>
              <DownArrowIcon />
            </Box>
          </Button>
        </>
      )}
    </Box>
  );
}
