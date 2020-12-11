// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

// want to return arrays of structs
pragma experimental ABIEncoderV2;

import "./IUpgradable.sol";
import "./common/AddressStorage.sol";
import "./Initializable.sol";

contract ContractRegistry is Initializable {
    mapping(string => address) private registry;
    string[] public keys;
    AddressStorage private maintainers;

    constructor() {}

    function initialize(
        address[] memory _maintainersList,
        string[] memory _keys,
        address[] memory _addresses
    ) public initializer() {
        maintainers = new AddressStorage(_maintainersList);
        setAddresses(_keys, _addresses);
    }

    modifier _onlyMaintainer() {
        require(maintainers.contains(msg.sender), "Can only be call by maintainer");
        _;
    }

    function upgradeContract(address _proxy, address _newImplementation) external _onlyMaintainer {
        IUpgradable(_proxy).upgradeTo(_newImplementation);
    }

    function _setAddress(string memory _key, address _addr) private {
        require(_addr != address(0), "Unset is not allowed");

        if (!contains(_key)) {
            keys.push(_key);
        }

        registry[_key] = _addr;
    }

    function setAddress(string calldata _key, address _addr) external _onlyMaintainer {
        _setAddress(_key, _addr);
    }

    function setAddresses(string[] memory _keys, address[] memory _addresses) public _onlyMaintainer {
        require(_keys.length == _addresses.length, "Length of keys should equivalent length of addresses");
        for(uint i = 0; i < _keys.length; ++i) {
            _setAddress(_keys[i], _addresses[i]);
        }
    }

    function setMaintainer(address _maintainer) external _onlyMaintainer {
        maintainers.mustAdd(_maintainer);
    }

    function leaveMaintainers() external {
        maintainers.mustRemove(msg.sender);
    }

    function contains(string memory _key) public view returns (bool) {
        return registry[_key] != address(0);
    }

    // getAddress is used by Q-client (do not remove it, Viktor!!!)
    function getAddress(string calldata _key) external view returns (address) {
        return registry[_key];
    }

    function mustGetAddress(string calldata _key) external view returns (address) {
        address addr = registry[_key];
        require(addr != address(0), "Key doesn't set");
        return addr;
    }

    struct Pair {
        string key;
        address addr;
    }

    function getContracts() external view returns (Pair[] memory) {
        string[] memory _keys = keys;
        Pair[] memory ctrs = new Pair[](_keys.length);
        for (uint8 i = 0; i < _keys.length; i++) {
            ctrs[i] = Pair(_keys[i], registry[_keys[i]]);
        }

        return ctrs;
    }
}
