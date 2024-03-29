'use client';

import React, {FC, useEffect, useRef, useState} from 'react';
import {createPopper, Placement} from '@popperjs/core';

import Item, {IDropdownItemProps} from './item';
import List, {IDropdownListProps} from './list';
import Trigger, {IDropdownTriggerProps} from './trigger';

interface IDropdownComposition {
  Trigger: FC<IDropdownTriggerProps>;
  Item: FC<IDropdownItemProps>;
  List: FC<IDropdownListProps>;
}

interface DropdownProps {
  options: string[];
  placement?: Placement;
  onChange?: (selectedOption: string) => void;
}

const Dropdown: FC<DropdownProps> & IDropdownComposition = ({options, onChange, placement = 'bottom-start'}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const onMenuClick = (option: string) => {
    onChange?.(option);
    closeMenu();
  };

  const popperOptions = {
    placement,
    modifiers: [
      {
        name: 'preventOverflow',
        options: {boundary: 'viewport'}
      }
    ]
  };

  const createPopperInstance = () => {
    if (buttonRef.current && menuRef.current) {
      return createPopper(buttonRef.current, menuRef.current, popperOptions);
    }
    return null;
  };

  // FIXME: Fix types
  const destroyPopperInstance = (instance: any) => {
    if (instance) instance.destroy();
  };

  // FIXME: Fix types
  const popperInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    destroyPopperInstance(popperInstanceRef.current);
    if (isOpen) {
      const instance = createPopperInstance();
      popperInstanceRef.current = instance;
    }
  }, [isOpen, placement]);

  return (
    <div className="abc-dropdown">
      <button className="abc-dropdown__trigger" ref={buttonRef} onClick={toggleMenu}>
        Open menu
      </button>
      {isOpen && (
        <>
          <div className="abc-dropdown__content" ref={menuRef} onClick={e => e.stopPropagation()}>
            {options.map(option => (
              <div key={option} onClick={() => onMenuClick(option)}>
                {option}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.List = List;
Dropdown.Item = Item;

export default Dropdown;
