﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservation.Domain.Models.DTO.Account
{
    public class UserDTO
    {
        public required string FirstName { get;set; }

        public required string LastName { get;set; }

        public required string PhoneNumber { get;set; }
    }
}
