<?php
function journal_movement()
{
	if (isset($_REQUEST['delete'])) {
		$jv_query = 'SELECT state FROM invent_journal_movement WHERE jvmovement_id="' . $_REQUEST['rowid'] . '"';
		$rjv = mysql_exe_query(array($jv_query, 1));
		$rn_jv = mysql_exe_fetch_array(array($rjv, 1));
		$state = $rn_jv['state'];
		if ($state == "SJVST181120050127") {
			$content .= "<script>alert('Sorry this data already confirmed, cant delete it.')</script>";
		} else {
			$del_query = 'DELETE FROM invent_journal_movement WHERE jvmovement_id="' . $_REQUEST['rowid'] . '"';
			mysql_exe_query(array($del_query, 1));

			$check_stock = 'DELETE FROM "PT_ Timuraya (BARU)$CMMS NAV Integration" WHERE "JVMovement ID"=\'' . $_REQUEST['rowid'] . '\'';
			sqlsrv_query(CONSQLSVR, $check_stock);

			$content .= "<script>alert('Your data was delete.')</script>";
		}
	}

	//======================================================================================//
	//==============Mendefinisikan hak akses masing-masing level permission=================//
	//======================================================================================//
	if (_VIEW_ && _DELETE_ && _EDIT_ && _INSERT_ && _FULL_) { // administrator
		$content .= modal_jmovement(array(TJVMOVEMENT));
		$jmove = JVMOVEMENT . ' AND (S.state_journal_movement_id = "SJVST181012013921" OR S.state_journal_movement_id = "SJVST181015082513" OR S.state_journal_movement_id = "SJVST181017012129" OR S.state_journal_movement_id = "SJVST181120050127") ORDER BY J.jvmovement_id DESC';
		$btnsync = ' <span><a class="btn btn-outline-primary btn-rounded btn-fw" href="' . PATH_SJVMOVE . SYNC . '">Sync</a></span>';
	} else if (_VIEW_ && _DELETE_ && _EDIT_ && _INSERT_ && !_FULL_) { // limited admin
		$content .= modal_jmovement(array(TJVMOVEMENT));
		$jmove = JVMOVEMENT . ' AND (S.state_journal_movement_id = "SJVST181015082513" OR S.state_journal_movement_id = "SJVST181120050127") ORDER BY J.jvmovement_id DESC';
		$btnsync = ' <span><a class="btn btn-outline-primary btn-rounded btn-fw" href="' . PATH_SJVMOVE . SYNC . '">Sync</a></span>';
	} else if (_VIEW_ && !_DELETE_ && _EDIT_ && _INSERT_) { // jika approve and creator
		$jmove = JVMOVEMENT . ' AND (S.state_journal_movement_id = "SJVST181012013921") ORDER BY J.jvmovement_id DESC';
		$btnsync = '';
	} else {
		$btnsync = '';
	}
	//======================================================================================//
	//==============Mendefinisikan hak akses masing-masing level permission=================//
	//======================================================================================//


	//======================================================================================//
	//==============Tampilkan data di awal halaman===========================================//
	//======================================================================================//
	$content .= '<br/><div class="ade">' . TJVMOVEMENT . '</div>';
	$content .= '<div class="toptext" align="center">' . _USER_VIEW_ . _USER_INSERT_ . $btnsync . '</div>';
	$content .= '<br/><div id="example1" style="width: 1030px; height: 500px; overflow: hidden; font-size=10px;"></div>';
	//-------set lebar kolom -------------
	$width = "[200,100,100,150,450,100,130,100]";
	//-------get id pada sql -------------
	$field = gen_mysql_id($jmove);
	//-------get header pada sql----------
	$name = gen_mysql_head($jmove);
	//-------set header pada handson------
	$sethead = "['JM No','Date','Plant','Asset','Item Name'" . _USER_EDIT_SETHEAD_ . ",'State','Work Order']";
	//-------set id pada handson----------
	$setid = "[{data:'ID',className: 'htLeft'},{data:'Date',className: 'htLeft'},{data:'Plant_Code',className: 'htLeft'},{data:'AssetNo',className: 'htLeft'},{data:'Item_Name',className: 'htLeft'}" . _USER_EDIT_SETID_ . ",{data:'State',className: 'htCenter', renderer: 'html'},{data:'Work_Order',className: 'htLeft'}]";
	//-------get data pada sql------------
	$dt = array($jmove, $field, array('Edit', 'Delete'), array(PATH_JVMOVEMENT . EDIT, PATH_JVMOVEMENT . DELETE), array('6'), PATH_JVMOVEMENT);
	$data = get_data_handson_func($dt);
	//----Fungsi memanggil data handsontable melalui javascript---
	$fixedcolleft = 0;
	$sethandson = array($sethead, $setid, $data, $width, $fixedcolleft);
	//--------fungsi hanya untuk meload data
	if (_VIEW_) $content .= get_handson($sethandson);
	//======================================================================================//
	//==============Tampilkan data di awal halaman===========================================//
	//======================================================================================//

	//===============================================//
	//------------Jika ada halaman tambah data-------//
	//===============================================//
	if (isset($_REQUEST['add'])) {
		$content = '<br/><div class="ade">' . TJVMOVEMENT . '</div>';
		$content .= '<div class="toptext" align="center">' . _USER_VIEW_ . _USER_INSERT_ . '</div>';
		//----- Buat Form Isian Berikut-----
		//=======Tabel 1 for 1st row=========//
		//---- Query Section ------//
		$option = '';
		$section = COMWOTRADE;
		$result = mysql_exe_query(array($section, 1));
		$option .= '<option value="">Choose Section</option>';
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '">' . $result_now[1] . '</option>';
		}
		$section_slc = '<select class="form-control" id="section" name="section">' . $option . '</select>';


		//---- Query Plant ------//
		$option = '';
		$plant = COMBPLANT;
		$result = mysql_exe_query(array($plant, 1));
		$option .= '<option value="">Choose Plant</option>';
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '">' . $result_now[1] . '</option>';
		}
		$plant_slc = '<select class="form-control" id="plant" name="plant">' . $option . '</select>';

		//---- Query Asset ------//
		$option = '';
		$asset = COMASSETS;
		$result = mysql_exe_query(array($asset, 1));
		$option .= '<option value="">Choose Asset</option>';
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '">' . $result_now[1] . '</option>';
		}
		$asset_slc = '<select class="form-control" id="asset" name="asset">' . $option . '</select>';

		//---- Query Work Order ------//
		$option = '';
		$work_order = COMBWORDER;
		$result = mysql_exe_query(array($work_order, 1));
		$option .= '<option value="">Choose Work Order</option>';
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '">' . $result_now[1] . '</option>';
		}
		$worder_slc = '<select class="form-control" id="worder" name="worder">' . $option . '</select>';

		$query_data = JVMOVEMENT;
		$result_data = mysql_exe_query(array($query_data, 1));
		$data_table = '';
		$i = 1;
		while ($result_data_now = mysql_exe_fetch_array(array($result_data, 1))) {
			$data_table .= '
				<tr>
					<td>' . $i . '</td>
					<td><input type="text" id="value1" readonly value="' . $result_data_now[0] . '" style="width:100%"></td>
					<td><input type="text" id="value2" readonly value="' . $result_data_now[1] . '" style="width:100%"></td>
					
				</tr>	
			';
			$i++;
		}
		$table_item = '
				<table id="item_table" class="table table-bordered table-striped" style="width:100%;font-size: 14px;margin-bottom:20px; ">
					<thead>
						<tr>
							<th> No Barang (Nav)</th>
							<th> Nama Barang </th>
							<th> Nama Barang (Nav) </th>
							
						</tr>
					</thead>
					<tbody>
					' . $data_table . '
					</tbody>	
				</table>
				';

		$table = '
				<table id="itemdata" class="table table-bordered" style="width:100%;font-size: 14px; ">
					<thead>
						<tr>
							<th> No </th>
							<th> Nama Barang </th>
							<th> Nama Barang (Nav) </th>
							<th> No Barang (Nav) </th>
							<th> Quantity </th>
							<th> Remark </th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>	
				</table>
				';

		$input = '<div style="margin-top:20px;margin-left:20px; font-size:12px;">
							<form action="' . PATH_JVMOVEMENT . ADD . POST . '" method="post" enctype="multipart/form-data">
                           	
                            <div class="row">
                           	<div class="col-6">
                                <div>
                                	<div class="row">
                                		<div class="col-3">Requested Date</div>
										<div class="col-1">:</div>
                                    	<div class="col-5">' . date_je(array('date', '')) . '</div>
                                    </div>
								</div>
                           	</div>
                           	<div class="col-6">
								<div>
                                	<div class="row">
										<div class="col-3">Section</div>
										<div class="col-1">:</div>
										<div class="col-5">' . $section_slc . '</div>
                                    </div>
								</div>
                           	</div>
                           	</div>
                            
                            <div class="row" style="margin-top:5px;">
                           	<div class="col-6">
                                <div>
                                	<div class="row">
										<div class="col-3">Plant</div>
										<div class="col-1">:</div>
										<div class="col-5">' . $plant_slc . '</div>
                                    </div>
								</div>
                           	</div>
                           	<div class="col-6">
								<div>
                                	<div class="row">
										<div class="col-3">Asset No : </div>
                                    	<div class="col-1">:</div>
										<div class="col-5">' . $asset_slc . '</div>
                                    </div>
								</div>
                           	</div>
                           	</div>
                            
                            <div class="row" style="margin-top:5px;">
                           	<div class="col-6">
                            	<div>
                                	<div class="row">
										<div class="col-3">Asset Description</div>
										<div class="col-1">:</div>
                                    	<div class="col-7"><span id="assdesc" style="font-weight:bold;"></span></div>
                                    </div>
								</div>
                           	</div>
                           	
                           	</div>
                            
                            <div class="row" style="margin-top:5px;">
                           	<div class="col-6">
                            	<div>
                                	<div class="row">
										<div class="col-3">Remarks </div>
										<div class="col-1">:</div>
                                    	<div class="col-7"><input type="text" class="form-control" name="remarks"></div>
                                    </div>
								</div>
                           	</div>
                           	
                           	</div>
                            
                            <div class="row" style="margin-top:5px;">
                           	<div class="col-6">
                            	<div>
                                	<div class="row">
										<div class="col-3">Work Order</div>
										<div class="col-1">:</div>
                                    	<div class="col-7">' . $worder_slc . '</div>
										<div class="col-1"><a href="' . PATH_WORDER . '">&nbsp&nbsp<i class="fa fa-plus fa-fw" style="font-size:14px;"></i></a></div>
                                    </div>
								</div>
                           	</div>
                           	<div class="col-6">
                           	</div>
                           	</div>
                            
                           	<div class="row" style="margin-top:10px;">
							<div class="col-2">
								<div class="d-flex justify-content-center">
									<a class="btn btn-outline-primary btn-md float-left" id="addModal">&nbsp&nbsp<i class="fa fa-plus fa-fw" style="font-size:14px;"></i> Add Item</a>
								</div>
								
                            </div>
                           	
                            </div>
								
                            <div class="p-2 row">
								<div class="col-1"></div><div class="col-12">' . $table_item . $table . '</div><div class="col-1"></div>
							</div>
							<div class="col-12">
								<div class="d-flex justify-content-center">
									<input class="btn btn-success pull-right" style="width:250px; " type="submit" value="Submit">
								</div>
								<div class="p-2 d-flex justify-content-center" >
									<div class="alert alert-primary" style="text-align:center;" id="progress">
										Loading Process.......................
									</div>
								</div>
                            </div>
							</form>
						  </div>';

		$content .= $input . js_movement();
		//------ Aksi ketika post menambahkan data -----//
		if (isset($_REQUEST['post'])) {
			if (!empty($_REQUEST['worder']) && !empty($_REQUEST['date'])) {
				$query = 'SELECT A.item_id, A.item_description, B.request_quantity FROM invent_item A, invent_item_work_order B WHERE A.item_id=B.itemspare AND WorkOrderNo="' . $_REQUEST['worder'] . '"';
				$result = mysql_exe_query(array($query, 1));
				$info = '';
				$i = 1;

				//Dapatkan lokasi, departement dan site WO dari asset
				$qworder = 'SELECT B.DepartmentId, B.DepartmentNo, D.LocationID, E.AreaCode FROM work_order A, department B, asset C, location D, area E WHERE A.DepartmentID=B.DepartmentID AND A.AssetID=C.AssetID AND C.LocationId=D.LocationId AND C.AreaId=E.AreaId AND A.WorkOrderNo="' . $_REQUEST['worder'] . '"';
				$rworder = mysql_exe_query(array($qworder, 1));
				$rnworder = mysql_exe_fetch_array(array($rworder, 1));
				$mydeptid = $rnworder[0];
				$mydept = $rnworder[1];
				$mylocat = $rnworder[2];
				$mysite = $rnworder[3];

				while ($resultnow = mysql_exe_fetch_array(array($result, 1))) {
					//-- Cek stock di dalam inventory //
					$qstock = 'SELECT stock, last_price FROM invent_item WHERE item_id="' . $_REQUEST['spare'] . '"';
					$resultstock = mysql_exe_query(array($qstock, 1));
					$resultnowstock = mysql_exe_fetch_array(array($resultstock, 1));
					$stock_now = $resultnowstock[0];
					$price = $resultnowstock[1];

					if (isset($_REQUEST['check_' . $resultnow[0]])) {
						//-- Generate a new id untuk kategori aset --// 
						$jvmovementid = get_new_code(array('JVMOVET', $numrow + $i, 1)) . $i;
						//-- Insert data pada kategori aset --//
						$field = array(
							'jvmovement_id',
							'item_id',
							'id_cost_center',
							'take_by',
							'number_of_stock',
							'state',
							'remark1',
							'remark2',
							'date_jvmovement',
							'WorkOrderNo'
						);
						$value = array(
							'"' . $jvmovementid . '"',
							'"' . $resultnow[0] . '"',
							'"' . $mydeptid . '"',
							'"' . $_SESSION['user'] . '"',
							'"' . $resultnow[2] . '"',
							'"SJVST181012013921"',
							'"' . $_REQUEST['text_' . $resultnow[0]] . '"',
							'""',
							'"' . $_REQUEST['date'] . '"',
							'"' . $_REQUEST['worder'] . '"',
							'""'
						);
						$query = mysql_stat_insert(array('invent_journal_movement', $field, $value));
						mysql_exe_query(array($query, 1));

						//Ambil detail data requestor//
						$q_req = 'SELECT EmployeeID, FirstName, OfficeLocation  FROM employee WHERE EmployeeID="' . $_REQUEST['requestor'] . '"';
						$result_req = mysql_exe_query(array($q_req, 1));
						$result_nreq = mysql_exe_fetch_array(array($result_req, 1));
						$req = $result_nreq[1];
						$off_req = $result_nreq[2];
						//Ambil unit item 
						$unit_item = 'SELECT unit FROM invent_unit A, invent_item B WHERE A.id_unit=B.id_unit AND B.item_id="' . $resultnow[0] . '"';
						$r_uitem =  mysql_exe_query(array($unit_item, 1));
						$rs_uitem =  mysql_exe_fetch_array(array($r_uitem, 1));
						$unit = $rs_uitem[0];
						//Ambil Department
						$q_dept = 'SELECT DepartmentNo FROM department WHERE DepartmentID="' . $_REQUEST['ccenter'] . '"';
						$r_dept =  mysql_exe_query(array($q_dept, 1));
						$rs_dept =  mysql_exe_fetch_array(array($r_dept, 1));
						$dept = $rs_dept[0];
						//Ambil Location
						$q_locat = 'SELECT LocationNo FROM location  WHERE LocationId="' . $_REQUEST['location'] . '"';
						$r_locat =  mysql_exe_query(array($q_locat, 1));
						$rs_locat =  mysql_exe_fetch_array(array($r_locat, 1));
						$locat = $rs_locat[0];
						//Ambil Site
						$q_site = 'SELECT AreaCode FROM area WHERE AreaId="' . $_REQUEST['site'] . '"';
						$r_site =  mysql_exe_query(array($q_site, 1));
						$rs_site =  mysql_exe_fetch_array(array($r_site, 1));
						$site = $rs_site[0];
						//Insert ke dalam Tabel tengah SQL Server
						$date_sent = date('Y-m-d');
						$q_middle_tb = 'INSERT INTO "PT_ Timuraya (BARU)$CMMS NAV Integration" ("JVMovement ID","Item No_","WO No_","Posting Date","Location Code","Quantity","Dim_ Divisi","Dim_ Product","Dim_ Site","State","Entry Type","Remaining Quantity","Unit Cost","Cost Amount","Unit of Measure Code","Date Sent","Sent by","Imported by","Journal Created","Import","Date Updated","Date Confirmed","Date Posted","Updated by","Confirmed by","Posted by","Date Imported") VALUES (\'' . $jvmovementid . '\',\'' . $resultnow[0] . '\',\'' . $_REQUEST['worder'] . '\',\'' . $_REQUEST['date'] . ' 00:00:00.000\',\'\',\'' . $resultnow[2] . '\',\'' . $mydept . '\',\'\',\'' . $mysite . '\',\'0\',\'0\',\'0\',\'0\',\'0\',\'' . $unit . '\',\'' . $date_sent . '\',\'' . $_SESSION['user'] . '\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\')'; //echo $q_middle_tb;
						sqlsrv_query(CONSQLSVR, $q_middle_tb);
					}
					$i++;
				}


				$content .= $info;
				//-- Ambil data baru dari database --//
				$querydat = JVMOVEMENT . ' AND WorkOrderNo="' . $_REQUEST['worder'] . '"';
				$content .= '<br/><div id="example1" style="width: 100%; height: 100%; overflow: hidden; font-size=10px;"></div>';
				//-------set lebar kolom -------------
				$width = "[200,100,200,150,250,100,100,130,100,80]";
				//-------get id pada sql -------------
				$field = gen_mysql_id(JVMOVEMENT);
				//-------get header pada sql----------
				$name = gen_mysql_head(JVMOVEMENT);
				//-------set header pada handson------
				$sethead = "['ID','Date','Item Name','Brand','Cost Center','Warehouse','Take By','Number of Stock','State'" . _USER_EDIT_SETHEAD_ . "]";
				//-------set id pada handson----------
				$setid = "[{data:'ID',className: 'htLeft'},{data:'Date',className: 'htLeft'},{data:'Item_Name',className: 'htLeft'},{data:'Brand',className: 'htLeft'},{data:'Cost_Center',className: 'htLeft'},{data:'Warehouse',className: 'htLeft'},{data:'Take_By',className: 'htLeft'},{data:'Number_of_Stock',className: 'htLeft'},{data:'State',className: 'htLeft'}" . _USER_EDIT_SETID_ . "]";
				//-------get data pada sql------------
				$dt = array($querydat, $field, array('Edit'), array(PATH_JVMOVEMENT . EDIT), array(), PATH_JVMOVEMENT);
				$data = get_data_handson_func($dt);
				$fixedcolleft = 0;
				$sethandson = array($sethead, $setid, $data, $width, $fixedcolleft);
				$content .= get_handson($sethandson);
			} else {
				$content = empty_info(array('Some field is empty')) . $content;
			}
		}
	}

	if (isset($_REQUEST['sync'])) {
		$content = '
                            <div class="alert alert-primary" id="progress" style="text-align:center;">
                              Syncronized Processing...........
                            </div>
                ';
		$content .= ' <div style="text-align:center;">
								<div><br/><div>
								<div class="alert alert-success" id="progress" 		style="text-align:center;">
									Use for syncronized Greskit to middle table in NAV. Get a update state and stock from NAV.
								</div>
								
								<button class="btn btn-success" id="sync">Syncronized (J. Movement) </button>
								
								<div><br/><div>
								<div class="alert alert-danger" id="progress" 		style="text-align:center;">
									Automatically refresh every 30 minutes after push this button. Dont close this page to use automatically refresh. Or open this page in server to use automatically refresh.
								</div>
							  </div>' . sync_jmove_jscript();
	}
	return $content;
}

function modal_jmovement($data)
{
	$title = $_REQUEST['dataid'];
	//## KETIKA UPDATE STATE ##//
	if (isset($_REQUEST['state'])) {
		$state = $_REQUEST['state'];
		$field = array(
			'state'
		);
		$value = array(
			'"' . $_REQUEST['state'] . '"'
		);

		if ($_REQUEST['state'] == 'SJVST181015082513' || $_REQUEST['state'] == 'SJVST181017012129') {
			//-- Update State---//
			$query = mysql_stat_update(array('invent_journal_movement', $field, $value, 'jvmovement_id="' . $_REQUEST['dataid'] . '"'));
			mysql_exe_query(array($query, 1));
		}

		if ($_REQUEST['state'] == 'SJVST181015082513' || $_REQUEST['state'] == 'SJVST181017012129') {
			//-- Update State---//
			$query = mysql_stat_update(array('invent_journal_movement', $field, $value, 'jvmovement_id="' . $_REQUEST['dataid'] . '"'));
			mysql_exe_query(array($query, 1));
		}

		//Jika state yang diupdate adalah confirm maka
		if ($_REQUEST['state'] == 'SJVST181120050127') {
			$qjmove = 'SELECT item_id, number_of_stock, remark1, CONCAT("Jurnal Movement - ",jvmovement_id) FROM invent_journal_movement WHERE jvmovement_id="' . $_REQUEST['dataid'] . '"';
			$resultjmove = mysql_exe_query(array($qjmove, 1));
			$resultnowjmove = mysql_exe_fetch_array(array($resultjmove, 1));

			//-- Cek stock di dalam inventory //
			$qstock = 'SELECT stock FROM invent_item WHERE item_id="' . $resultnowjmove[0] . '"';
			$resultstock = mysql_exe_query(array($qstock, 1));
			$resultnowstock = mysql_exe_fetch_array(array($resultstock, 1));
			$stock_now = $resultnowstock[0];

			//--- Tidak diperkenankan stok yang direquest kurang dari stok yang tersedia ------
			$note = '';
			//if($stock_now>=$resultnowjmove[1]){			
			//-- Update State---//
			$query = mysql_stat_update(array('invent_journal_movement', $field, $value, 'jvmovement_id="' . $_REQUEST['dataid'] . '"'));
			mysql_exe_query(array($query, 1));
			//-- Update State di NAV --//
			$date_conf = date('Y-m-d');
			$nav_state = 'UPDATE "PT_ Timuraya (BARU)$CMMS NAV Integration" SET "State"=\'3\', "Date Confirmed"=\'' . $date_conf . '\', "Confirmed by"=\'' . $_SESSION['user'] . '\' WHERE "JVMovement ID"=\'' . $_REQUEST['dataid'] . '\'';
			sqlsrv_query(CONSQLSVR, $nav_state);
			//-- Upadate for movement --//
			$movmntid = get_new_code(array('MOVMNT', $numrow, 1));
			//-- Insert data pada tabel movement --//
			$field = array(
				'movement_id',
				'id_topup',
				'item_id',
				'movement_date',
				'qty',
				'type',
				'remark1',
				'remark2'
			);
			$value = array(
				'"' . $movmntid . '"',
				'"' . $_REQUEST['dataid'] . '"',
				'"' . $resultnowjmove[0] . '"',
				'"' . date('Y-m-d') . '"',
				'"' . $resultnowjmove[1] . '"',
				'"Withdraw"',
				'"' . $resultnowjmove[2] . '"',
				'"' . $resultnowjmove[3] . '"',
			);
			$query = mysql_stat_insert(array('invent_movement', $field, $value));
			mysql_exe_query(array($query, 1));
		}
	}

	//### FORM STATE##//
	$query = UPSTAMV . ' WHERE jvmovement_id="' . $_REQUEST['dataid'] . '"';
	$result = mysql_exe_query(array($query, 1));
	$resultnow = mysql_exe_fetch_array(array($result, 1));
	$stateid = $resultnow[0];
	//### MENDEFINISIKAN COMBSTATE JIKA STATUS ADALAH Send Approve atau Refused //
	if (_VIEW_ && _DELETE_ && _EDIT_ && _INSERT_ && _FULL_) { //administrator
		if ($stateid == 'SJVST181012013921') {
			$qstate = COMBSTATE . ' WHERE state_journal_movement_id NOT IN ("SJVST181015082513","SJVST181012013921","SJVST181017012129","SJVST181120050127")';
		} else if ($stateid == 'SJVST181015082513') {
			$check_stock = 'SELECT "Quantity" Qty,"Remaining Quantity" Rmn_Qty FROM "PT_ Timuraya (BARU)$CMMS NAV Integration" WHERE "JVMovement ID"=\'' . $_REQUEST['dataid'] . '\'';
			$res_check = sqlsrv_query(CONSQLSVR, $check_stock);
			$resn_check = sqlsrv_fetch_array($res_check, SQLSRV_FETCH_ASSOC);
			$qty = intval($resn_check['Qty']);
			$rmnqty = intval($resn_check['Rmn_Qty']);
			echo $rmnqty;
			if ($rmnqty > $qty) {
				$qstate = COMBSTATE . ' WHERE state_journal_movement_id NOT IN ("SJVST181015082513","SJVST181012013921","SJVST181017012129")';
			} else {
				$qstate = COMBSTATE . ' WHERE state_journal_movement_id NOT IN ("SJVST181015082513","SJVST181012013921","SJVST181017012129","SJVST181120050127")';
				$note = empty_info(array('Sorry cant request the stock because the stock in NAV : ' . $rmnqty));
			}
		} else {
			$qstate = COMBSTATE . ' WHERE state_journal_movement_id NOT IN ("SJVST181015082513","SJVST181012013921","SJVST181017012129","SJVST181120050127")';
		}
	} else if (_VIEW_ && _DELETE_ && _EDIT_ && _INSERT_ && !_FULL_) { //limited admin
		if ($stateid == 'SJVST181017012129') {
			$qstate = COMBSTATE . ' WHERE state_journal_movement_id NOT IN ("SJVST181015082513","SJVST181012013921","SJVST181017012129","SJVST181120050127")';
		} else if ($stateid == 'SJVST181015082513') {
			$check_stock = 'SELECT "Quantity" Qty,"Remaining Qtuantity" Rmn_Qty FROM "PT_ Timuraya (BARU)$CMMS NAV Integration" WHERE "JVMovement ID"=\'' . $_REQUEST['dataid'] . '\'';
			$res_check = sqlsrv_query(CONSQLSVR, $check_stock);
			$resn_check = sqlsrv_fetch_array($res_check, SQLSRV_FETCH_ASSOC);
			$qty = intval($resn_check['Qty']);
			$rmnqty = intval($resn_check['Rmn_Qty']);
			if ($rmnqty > $qty) {
				$qstate = COMBSTATE . ' WHERE state_journal_movement_id NOT IN ("SJVST181015082513","SJVST181012013921","SJVST181017012129")';
			} else {
				$qstate = COMBSTATE . ' WHERE state_journal_movement_id NOT IN ("SJVST181015082513","SJVST181012013921","SJVST181017012129","SJVST181120050127")';
				$note = empty_info(array('Sorry cant request the stock because the stock in NAV : ' . $rmnqty));
			}
		} else {
			$qstate = COMBSTATE . ' WHERE state_journal_movement_id NOT IN ("SJVST181015082513","SJVST181012013921","SJVST181017012129","SJVST181120050127")';
		}
	} else if (_VIEW_ && !_DELETE_ && _EDIT_ && _INSERT_ && !_FULL_) { // approver, creator
		$qstate = COMBSTATE . ' WHERE state_journal_movement_id NOT IN ("SJVST181015082513","SJVST181012013921","SJVST181017012129","SJVST181120050127")';
	} else {
		$qstate = COMBSTATE;
	}
	$page = PATH_JVMOVEMENT . '&dataid=' . $_REQUEST['dataid'] . '#popup-article';
	$name_field = array('State');
	$input_type = array(
		combo_je(array($qstate, 'state', 'state', 300, '', ''))
	);
	$signtofill = array('<small id="fill" class="form-text text-muted">Update state after send.</small>');
	$form = create_form(array('', $page, 1, $name_field, $input_type, $signtofill));
	//### ############//

	$content = '	
			<div id="popup-article" class="popup">
			  <div class="popup__block">
				<h1 class="popup__title">' . $title . '</h1>
				' . $form . $note . '
				<a href="#" class="popup__close">close</a>
			  </div>
			</div>
			';
	return $content;
}

function sync_jmove_jscript()
{
	$content = "
                <script>
                    $('#progress').hide();
                    
                    $('#sync').on('click',function(){
                        executeSchedule();
                    })
					
					function executeSchedule(){
						$.ajax({
							type: 'POST',
							url:'" . _ROOT_ . "function/content_menu/journal_movement/sync.php',
							data: {'data':'inventory'},
							crossDomain: true,
							cache: false,
							beforeSend: function(){
								$('#progress').show();
							},	
							success:function(data){ 
								//alert(data);
								$('#progress').hide();
							}
						})
						setTimeout(executeSchedule, 1800000); 
					}
                </script>
        ";
	return $content;
}

function js_movement()
{
	$content = "<script>
						$(document).ready(function(){
							$('#progress').hide();
							$('#item_table').hide();
						})
						$('#addModal').on('click',function(){
							$('#item_table').show();
							
						})
						$('#item_table').DataTable();
						
						var value1 = $('#value1').val();
						var value2 = $('#value2').val();
						var i = 1;
						$('#item_table tbody').on( 'click', 'tr', function () {
							
							$('#itemdata').find('tbody').append('<tr><td>'+i+'</td><td><input type=\"text\" class=\"form-control input-xs\" id=\"value1\" value=\"'+value1+'\" name=\"value1\" readonly></td><td><input type=\"text\" class=\"form-control input-xs\" id=\"value2\" value=\"'+value2+'\" name=\"value2\" readonly></td><td><input type=\"text\" class=\"form-control input-xs\" id=\"value3\" value=\"'+value1+'\" name=\"value3\" readonly></td><td><input type=\"number\" class=\"form-control input-xs\" id=\"quantity\" name=\"quantity\"></td></td><td><input type=\"text\" class=\"form-control input-xs\" id=\"nilai_result\"></td></tr>')
							i++;
						});
						
						$('#plant').on('change',function(){
							var plant = $('#plant').val();
							$('#asset').empty();
							$('#assdesc').empty();
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/work_plant_change.php',
								data:{'plant':plant},
								crossDomain:true,
								cache:false,
								success:function(data){
									//alert(data);
									$('#asset').append(data);
								}
							})
						})
						$('#asset').on('change',function(){
							var asset = $('#asset').val();
							var plant = $('#plant').val();
							
							$('#assdesc').empty();
							$('#worder').empty();
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/work_asset_desc.php',
								data:{'asset':asset,'plant':plant},
								crossDomain:true,
								cache:false,
								success:function(data){
									//alert(data);
									$('#assdesc').append(data);
									
								}
							})

							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/work_order_change.php',
								data:{'asset':asset,'plant':plant},
								crossDomain:true,
								cache:false,
								success:function(data){
									//alert(data);
									console.log(data)
									$('#worder').append(data);

								}
							})
						})
						
						$('#worder').on('change',function(){
							$('#itemdata').empty();
							var wo = $('#worder').val(); 
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/journal_movement/wo_item.php',
								data: {'wo':wo},
								crossDomain: true,
								cache: false,
								beforeSend: function(){
									$('#progress').show();
								},	
								success:function(data){ 
									$('#progress').hide();
									$('#itemdata').append(data);
								}
							})
						})
					</script>";
	return $content;
}
